// ============================================================================
// TCET ACM SIGITE - Contact Form Serverless API Handler (Vercel)
// Features: Server-side IP Rate Limiting, Origin-Restricted CORS,
// Honeypot Protection, CRLF Injection Sanitization, Upstream Timeout Handling
// ============================================================================

// ----------------------------------------------------------------------------
// 1. Rate Limiting Configuration & In-Memory Sliding Window
// ----------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 valid submissions per 15 min per IP
const MAX_TRACKED_IPS = 5000; // Cap map size to prevent memory leaks

const memoryRateLimitMap = new Map();

function cleanOldEntries(now) {
  for (const [ip, timestamps] of memoryRateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      memoryRateLimitMap.delete(ip);
    } else {
      memoryRateLimitMap.set(ip, valid);
    }
  }
}


// Record a valid submission and consume one rate limit token
function consumeInMemoryRateLimit(ip) {
  const now = Date.now();

  if (memoryRateLimitMap.size > MAX_TRACKED_IPS) {
    cleanOldEntries(now);
  }

  const timestamps = memoryRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = validTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      retryAfter: retryAfterSeconds,
      remaining: 0,
      limit: MAX_REQUESTS_PER_WINDOW,
      reset: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS) / 1000)
    };
  }

  validTimestamps.push(now);
  memoryRateLimitMap.set(ip, validTimestamps);

  return {
    allowed: true,
    retryAfter: 0,
    remaining: MAX_REQUESTS_PER_WINDOW - validTimestamps.length,
    limit: MAX_REQUESTS_PER_WINDOW,
    reset: Math.ceil((validTimestamps[0] + RATE_LIMIT_WINDOW_MS) / 1000)
  };
}

// Check and consume rate limit token (Upstash Redis with in-memory fallback)
async function consumeRateLimit(ip) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return consumeInMemoryRateLimit(ip);
  }

  try {
    const key = `ratelimit:contact:${ip}`;
    const res = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['INCR', key],
        ['TTL', key]
      ]),
      signal: AbortSignal.timeout(2000)
    });

    if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);
    const data = await res.json();
    const count = data[0]?.result || 1;
    let ttl = data[1]?.result;

    if (count === 1 || ttl === -1) {
      await fetch(`${redisUrl}/expire/${key}/900`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        signal: AbortSignal.timeout(1000)
      }).catch(() => {});
      ttl = 900;
    }

    if (count > MAX_REQUESTS_PER_WINDOW) {
      return {
        allowed: false,
        retryAfter: ttl > 0 ? ttl : 900,
        remaining: 0,
        limit: MAX_REQUESTS_PER_WINDOW,
        reset: Math.ceil(Date.now() / 1000) + (ttl > 0 ? ttl : 900)
      };
    }

    return {
      allowed: true,
      retryAfter: 0,
      remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - count),
      limit: MAX_REQUESTS_PER_WINDOW,
      reset: Math.ceil(Date.now() / 1000) + (ttl > 0 ? ttl : 900)
    };
  } catch (err) {
    console.warn('Redis rate limit error, falling back to in-memory:', err.message);
    if (process.env.REDIS_FAIL_CLOSED === 'true') {
      return {
        allowed: false,
        retryAfter: 60,
        remaining: 0,
        limit: MAX_REQUESTS_PER_WINDOW,
        reset: Math.ceil(Date.now() / 1000) + 60
      };
    }
    return consumeInMemoryRateLimit(ip);
  }
}

// Refund a rate limit token if upstream email delivery fails or times out
async function refundRateLimit(ip) {
  // 1. In-memory token refund
  const timestamps = memoryRateLimitMap.get(ip);
  if (timestamps && timestamps.length > 0) {
    timestamps.pop();
    if (timestamps.length === 0) {
      memoryRateLimitMap.delete(ip);
    } else {
      memoryRateLimitMap.set(ip, timestamps);
    }
  }

  // 2. Upstash Redis token refund (if configured)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      const key = `ratelimit:contact:${ip}`;
      await fetch(`${redisUrl}/decr/${key}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        signal: AbortSignal.timeout(1500)
      }).catch(() => {});
    } catch (_err) {}
  }
}

// ----------------------------------------------------------------------------
// 2. CORS Whitelist Validation
// ----------------------------------------------------------------------------
const ALLOWED_ORIGIN_PATTERNS = [
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)?tcetacm\.com$/,
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)?tcetacm\.in$/,
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)?tcetacmsigite\.org$/
];

const PREVIEW_ORIGIN_PATTERNS = [
  /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/
];

function isOriginAllowed(origin) {
  if (!origin) return true; // Direct same-origin or non-browser server request

  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  // If custom ALLOWED_ORIGIN is explicitly configured, enforce strictly in production
  if (process.env.ALLOWED_ORIGIN) {
    const configuredOrigins = process.env.ALLOWED_ORIGIN.split(',').map((o) => o.trim().toLowerCase());
    if (configuredOrigins.includes(origin.toLowerCase())) {
      return true;
    }
    // In strict production with configured origin, reject unlisted origins
    if (isProduction) {
      return false;
    }
  }

  if (ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin))) {
    return true;
  }

  // Allow *.vercel.app only in preview / development environments
  if (!isProduction && PREVIEW_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin))) {
    return true;
  }

  return false;
}

// ----------------------------------------------------------------------------
// 3. Sanitization & Validation Constants
// ----------------------------------------------------------------------------
const ALLOWED_CATEGORIES = [
  'General Inquiry',
  'Student & Faculty Feedback',
  'Membership & Registration',
  'Hackathon & Competitions',
  'Sponsorship & Industry Collaboration',
  'Research Paper Publications',
  'Technical Workshop Proposal'
];

// Strip CRLF and control characters to prevent header injection attacks
function sanitizeSingleLine(str) {
  return String(str || '')
    .replace(/[\r\n\x00-\x1f\x7f]/g, ' ')
    .trim();
}

// Extract verified client IP (Vercel edge network headers prioritize trusted client IP)
function getClientIp(req) {
  // 1. Vercel trusted edge IP header (cannot be spoofed from client)
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  if (typeof vercelIp === 'string' && vercelIp.trim()) {
    return vercelIp.split(',')[0].trim();
  }

  // 2. Standard real-ip header
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  // 3. x-forwarded-for header (proxies like Cloudflare / Vercel append client IP to the end or beginning)
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    const ips = forwarded.split(',').map((ip) => ip.trim()).filter(Boolean);
    return ips[ips.length - 1] || ips[0];
  }

  // 4. Node socket fallback
  return req.socket?.remoteAddress || '127.0.0.1';
}

// ----------------------------------------------------------------------------
// 4. Main Serverless Handler
// ----------------------------------------------------------------------------
export default async function handler(req, res) {
  const origin = req.headers.origin;
  const originAllowed = isOriginAllowed(origin);

  // Set restrictive CORS headers if origin is validated
  if (origin && originAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  // Handle CORS Preflight OPTIONS
  if (req.method === 'OPTIONS') {
    if (origin && !originAllowed) {
      return res.status(403).json({ success: false, error: 'Forbidden: CORS origin not allowed.' });
    }
    return res.status(204).end();
  }

  // Reject unauthorized cross-origin POST requests
  if (origin && !originAllowed) {
    return res.status(403).json({ success: false, error: 'Forbidden: Request origin is not permitted.' });
  }

  // Reject any non-POST methods
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  const clientIp = getClientIp(req);


  try {
    const {
      fullName,
      email,
      phone,
      department,
      category,
      subject,
      message,
      honeypot,
      _gotcha,
      website,
      website_url
    } = req.body || {};

    // ------------------------------------------------------------------------
    // Step 1: Honeypot Spam Trap
    // Automated bots triggering the trap do NOT consume user rate-limit quota!
    // ------------------------------------------------------------------------
    const trapValue = honeypot || _gotcha || website || website_url;
    if (trapValue && String(trapValue).trim().length > 0) {
      // Return 200 fake success to disarm automated spam bots without forwarding
      return res.status(200).json({
        success: true,
        message: 'Message received successfully.'
      });
    }

    // ------------------------------------------------------------------------
    // Step 2: Input Sanitization & Strict Validation
    // Validation errors (typos, short messages) do NOT consume rate-limit quota!
    // ------------------------------------------------------------------------
    const cleanName = sanitizeSingleLine(fullName);
    const cleanEmail = sanitizeSingleLine(email).toLowerCase();
    const cleanPhone = sanitizeSingleLine(phone);
    const cleanDept = sanitizeSingleLine(department);
    let cleanCategory = sanitizeSingleLine(category);
    const cleanSubject = sanitizeSingleLine(subject);
    const cleanMessage = String(message || '').trim();

    // 1. Full Name Validation
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters.' });
    }
    if (cleanName.length > 100) {
      return res.status(400).json({ success: false, error: 'Full name cannot exceed 100 characters.' });
    }

    // 2. Email Validation (RFC 5322 standard check)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 254) {
      return res.status(400).json({ success: false, error: 'A valid email address is required (maximum 254 characters).' });
    }

    // 3. Optional Phone Validation
    if (cleanPhone) {
      if (cleanPhone.length > 20) {
        return res.status(400).json({ success: false, error: 'Phone number cannot exceed 20 characters.' });
      }
      const phoneDigitsOnly = cleanPhone.replace(/[\s\-.()]/g, '');
      const validPhonePattern = /^(?:\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
      if (!validPhonePattern.test(cleanPhone) || phoneDigitsOnly.length < 7 || phoneDigitsOnly.length > 15) {
        return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
      }
    }

    // 4. Category Validation (Constrain to allowed categories)
    if (!cleanCategory || !ALLOWED_CATEGORIES.includes(cleanCategory)) {
      cleanCategory = 'General Inquiry';
    }

    // 5. Optional Department Validation
    if (cleanDept.length > 100) {
      return res.status(400).json({ success: false, error: 'Department cannot exceed 100 characters.' });
    }

    // 6. Subject Validation
    if (!cleanSubject || cleanSubject.length < 3) {
      return res.status(400).json({ success: false, error: 'Subject must be at least 3 characters.' });
    }
    if (cleanSubject.length > 150) {
      return res.status(400).json({ success: false, error: 'Subject cannot exceed 150 characters.' });
    }

    // 7. Message Details Validation
    if (!cleanMessage || cleanMessage.length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });
    }
    if (cleanMessage.length > 3000) {
      return res.status(400).json({ success: false, error: 'Message cannot exceed 3000 characters.' });
    }

    // ------------------------------------------------------------------------
    // Step 3: Consume Rate-Limit Token ONLY for valid human submissions
    // ------------------------------------------------------------------------
    const rateLimit = await consumeRateLimit(clientIp);

    res.setHeader('X-RateLimit-Limit', String(rateLimit.limit));
    res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));
    res.setHeader('X-RateLimit-Reset', String(rateLimit.reset));

    if (!rateLimit.allowed) {
      res.setHeader('Retry-After', String(rateLimit.retryAfter));
      return res.status(429).json({
        success: false,
        error: `Too many submissions from your connection. Please wait ${Math.ceil(rateLimit.retryAfter / 60)} minute(s) before trying again.`
      });
    }

    // ------------------------------------------------------------------------
    // Step 4: Forward Submission to Upstream Mail Service (FormSubmit)
    // ------------------------------------------------------------------------
    const targetEmail = process.env.CONTACT_EMAIL || 'acm.sigite@tcetmumbai.in';
    const backupEmail = process.env.CONTACT_BACKUP_EMAIL || 'Shukla.girik@gmail.com';
    const forwardUrl = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

    const forwardPayload = {
      _subject: `[TCET ACM Inquiry] ${cleanCategory} — ${cleanSubject}`,
      _replyto: cleanEmail,
      _template: 'table',
      'Full Name': cleanName,
      'Email Address': cleanEmail,
      'Phone Number': cleanPhone || 'N/A',
      'Department': cleanDept || 'N/A',
      'Category': cleanCategory,
      'Subject': cleanSubject,
      'Message': cleanMessage
    };

    // Attach backup CC recipient
    if (backupEmail) {
      forwardPayload._cc = backupEmail.trim();
    }

    let forwardResponse;
    try {
      forwardResponse = await fetch(forwardUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(forwardPayload),
        signal: AbortSignal.timeout(8000) // 8-second timeout for upstream resilience
      });
    } catch (fetchErr) {
      await refundRateLimit(clientIp);
      if (fetchErr.name === 'TimeoutError' || fetchErr.name === 'AbortError') {
        console.error('Contact API Upstream Timeout (FormSubmit)');
        return res.status(504).json({
          success: false,
          error: 'The notification service timed out. Please email acm.sigite@tcetmumbai.in directly.'
        });
      }
      throw fetchErr;
    }

    if (forwardResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted to TCET ACM SIGITE successfully.'
      });
    } else {
      await refundRateLimit(clientIp);
      const forwardErr = await forwardResponse.json().catch(() => ({}));
      console.error('Upstream FormSubmit error:', forwardResponse.status, forwardErr);
      return res.status(502).json({
        success: false,
        error: forwardErr.message || 'Notification service rejected the inquiry. Please email directly.'
      });
    }
  } catch (error) {
    await refundRateLimit(clientIp);
    console.error('Contact API Internal Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message. Please try again later.'
    });
  }
}
