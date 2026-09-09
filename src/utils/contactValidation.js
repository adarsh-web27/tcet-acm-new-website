const RATE_LIMIT_KEY = 'tcet_acm_contact_rate_limit';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15-minute sliding window

// Robust email validator conforming to RFC standards
export function validateEmail(email) {
  const trimmed = email ? email.trim() : '';
  if (!trimmed) {
    return 'Email address is required.';
  }
  if (/\s/.test(trimmed)) {
    return 'Email address cannot contain spaces.';
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return 'Please enter a valid email address with a single @ symbol.';
  }
  const [local, domain] = parts;
  if (!local) {
    return 'Email username part is missing before the @ symbol.';
  }
  if (local.startsWith('.') || local.endsWith('.')) {
    return 'Email cannot start or end with a dot before the @ symbol.';
  }
  if (local.includes('..')) {
    return 'Email cannot contain consecutive dots.';
  }
  const localRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  if (!localRegex.test(local)) {
    return 'Email contains invalid characters in username.';
  }
  if (!domain) {
    return 'Email domain part is missing after the @ symbol.';
  }
  if (domain.includes('..')) {
    return 'Domain cannot contain consecutive dots.';
  }
  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return 'Domain must include an extension (e.g., .org, .edu, .com).';
  }
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return 'Domain extension must be at least 2 letters (e.g., .com, .in).';
  }
  for (const part of domainParts) {
    if (!part) {
      return 'Domain contains empty segments.';
    }
    if (part.startsWith('-') || part.endsWith('-')) {
      return 'Domain parts cannot start or end with a hyphen.';
    }
    if (!/^[a-zA-Z0-9-]+$/.test(part)) {
      return 'Domain contains invalid characters.';
    }
  }
  return null;
}

// Indian mobile phone number validator (10 digits starting with 6-9, optional +91, 91, or 0)
export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return null; // Optional field
  }
  const cleaned = phone.trim().replace(/[\s\-.()]/g, '');
  const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(cleaned)) {
    return 'Please enter a valid 10-digit Indian phone number (e.g. +91 98765 43210).';
  }
  return null;
}

// LocalStorage sliding window rate limiter
export function checkRateLimit() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const timestamps = raw ? JSON.parse(raw) : [];
    
    // Purge entries older than 15 minutes
    const validTimestamps = timestamps.filter(t => typeof t === 'number' && now - t < WINDOW_MS);
    
    if (validTimestamps.length !== timestamps.length) {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(validTimestamps));
    }

    if (validTimestamps.length >= MAX_SUBMISSIONS) {
      const oldest = Math.min(...validTimestamps);
      const remainingMs = WINDOW_MS - (now - oldest);
      const remainingMins = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
      return {
        allowed: false,
        cooldownMinutes: remainingMins,
        message: `You've reached the submission limit (3 per 15 minutes). Please try again in about ${remainingMins} minute${remainingMins > 1 ? 's' : ''}.`
      };
    }

    return { allowed: true };
  } catch (err) {
    return { allowed: true };
  }
}

export function recordSubmission() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const timestamps = raw ? JSON.parse(raw) : [];
    const validTimestamps = timestamps.filter(t => typeof t === 'number' && now - t < WINDOW_MS);
    validTimestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(validTimestamps));
  } catch (err) {
    // Graceful silence on storage errors
  }
}
