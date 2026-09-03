import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare, 
  Building2, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const RATE_LIMIT_KEY = 'tcet_acm_contact_rate_limit';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15-minute sliding window

// Robust email validator conforming to RFC standards & user requirements
function validateEmail(email) {
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
function validatePhone(phone) {
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
function checkRateLimit() {
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
    // If localStorage is unavailable or blocked, allow graceful submission
    return { allowed: true };
  }
}

function recordSubmission() {
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

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | null
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    'General Inquiry',
    'Membership & Registration',
    'Hackathon & Competitions',
    'Sponsorship & Industry Collaboration',
    'Research Paper Publications',
    'Technical Workshop Proposal'
  ];

  const faqs = [
    {
      question: "How can I join TCET ACM SIGITE Student Chapter?",
      answer: "Membership drives open at the beginning of each academic term for students across all engineering branches. You can register via our official portal or inquiry form, attend the chapter orientation, and receive your verified international ACM membership credentials."
    },
    {
      question: "What are the benefits of having an official ACM membership?",
      answer: "Members receive full access to the ACM Digital Library (500,000+ peer-reviewed papers), exclusive entry into chapter hackathons (ACM ReCode, InnovGenius), priority access to technical masterclasses, verified digital certificates, and 1-on-1 mentorship for paper publications."
    },
    {
      question: "Can non-IT department students participate in hackathons?",
      answer: "Yes! All flagship TCET ACM SIGITE hackathons, ideathons, and workshops are open to students across all engineering departments (Computer, AI&DS, IoT, EXTC, etc.) as well as external university participants."
    },
    {
      question: "How does the chapter support research publications?",
      answer: "Through our ACM Ezine platform, students receive 1-on-1 faculty mentorship from Dr. Rajesh Bansode and senior mentors to format, write, and submit technical papers to Scopus-indexed and IEEE international conferences."
    },
    {
      question: "How can industry partners or sponsors collaborate with the chapter?",
      answer: "Corporate partners can sponsor problem statements, conduct technical recruitment drives, or host specialized masterclasses. Reach out via the form selecting 'Sponsorship & Industry Collaboration' or email tcetacm@thakureducation.org."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (rateLimitMessage) {
      setRateLimitMessage('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldError = null;

    if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'phone') {
      fieldError = validatePhone(value);
    } else if (name === 'fullName' && value.trim()) {
      if (value.trim().length < 2) fieldError = 'Full name must be at least 2 characters.';
    } else if (name === 'subject' && value.trim()) {
      if (value.trim().length < 3) fieldError = 'Subject must be at least 3 characters.';
    } else if (name === 'message' && value.trim()) {
      if (value.trim().length < 10) fieldError = 'Message must be at least 10 characters.';
    }

    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Prevent multiple simultaneous requests
    if (isSubmitting) return;

    // 2. Strong Honeypot Spam Protection (detectable by bots, invisible to humans)
    if (honeypot && honeypot.trim()) {
      console.warn('Silent bot trap activated.');
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          department: '',
          category: 'General Inquiry',
          subject: '',
          message: ''
        });
        setHoneypot('');
        setErrors({});
      }, 500);
      return;
    }

    // 3. Client-Side Rate Limiting Check
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitMessage(rateCheck.message);
      return;
    }
    setRateLimitMessage('');

    // 4. Comprehensive Form Validation
    const newErrors = {};

    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = 'Full Name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      newErrors.email = emailErr;
    }

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      newErrors.phone = phoneErr;
    }

    const trimmedSubject = formData.subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = 'Subject is required.';
    } else if (trimmedSubject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Message details are required.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 5. Transmit to FormSubmit with Automatic Reply-To & Clean Payload
    const trimmedEmail = formData.email.trim();
    const formattedPhone = formData.phone && formData.phone.trim() ? formData.phone.trim() : 'Not Provided';
    const formattedDept = formData.department && formData.department.trim() ? formData.department.trim() : 'Not Specified';

    try {
      const response = await fetch('https://formsubmit.co/ajax/tcetacm@thakureducation.org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[TCET ACM Inquiry] ${formData.category} — ${trimmedSubject}`,
          _replyto: trimmedEmail,
          _template: 'table',
          'Full Name': trimmedName,
          'Email Address': trimmedEmail,
          'Phone Number': formattedPhone,
          'Department': formattedDept,
          'Category': formData.category,
          'Subject': trimmedSubject,
          'Message': trimmedMessage,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      if (response.ok) {
        // Record successful submission timestamp for rate limiting
        recordSubmission();
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          department: '',
          category: 'General Inquiry',
          subject: '',
          message: ''
        });
        setHoneypot('');
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 7000);
      } else {
        throw new Error('FormSubmit returned a non-OK status.');
      }
    } catch (err) {
      console.warn('Form submission fallback:', err);
      // Construct mailto link as graceful client fallback preserving user data
      const subjectEncoded = encodeURIComponent(`[TCET ACM Inquiry] ${formData.category} — ${trimmedSubject}`);
      const bodyContent = [
        `Full Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Phone Number: ${formattedPhone}`,
        `Department: ${formattedDept}`,
        `Category: ${formData.category}`,
        `\nMessage Details:\n${trimmedMessage}`
      ].join('\n');
      
      window.location.href = `mailto:tcetacm@thakureducation.org?subject=${subjectEncoded}&body=${encodeURIComponent(bodyContent)}`;
      setSubmitStatus('fallback');
      setTimeout(() => setSubmitStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-[#0B1F33] pt-28 pb-24 overflow-x-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-20">
        
        {/* ================= HERO HEADER ================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30 text-[#0B1F33] text-xs font-mono font-bold uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
            <span>Connect & Collaborate</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0B1F33] uppercase tracking-tight leading-[1.08]"
          >
            Connect with TCET ACM <br />
            <span className="italic text-[#0B1F33]">
              Student Chapter
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#1E40AF] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Have questions about membership, hackathon collaborations, sponsorship, or research paper submissions? Reach out directly to our committee.
          </motion.p>
        </section>

        {/* ================= 2-COLUMN CONTACT LAYOUT ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CHAPTER SECRETARIAT & INSTITUTIONAL INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-8 sm:p-10 shadow-[0_12px_35px_-8px_rgba(3,109,164,0.14)] space-y-8"
          >
            {/* Header Badge & Title */}
            <div className="space-y-3">
              <span className="inline-block font-mono text-[11px] font-bold text-[#0B1F33] uppercase tracking-wider px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30">
                Institutional Location
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] tracking-tight">
                Chapter Secretariat
              </h2>
              <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                Department of Information Technology, Thakur College of Engineering & Technology.
              </p>
            </div>

            {/* Address, Email, Desk Rows */}
            <div className="space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] text-[#0B1F33] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#0B1F33] uppercase tracking-wider block">
                    Campus Address:
                  </span>
                  <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                    A-Block, Thakur Educational Campus, Shyamnarayan Thakur Marg, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101
                  </p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] text-[#0B1F33] flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#0B1F33] uppercase tracking-wider block">
                    Official Email:
                  </span>
                  <a 
                    href="mailto:tcetacm@thakureducation.org" 
                    className="text-xs sm:text-sm text-[#0B1F33] font-bold hover:underline"
                  >
                    tcetacm@thakureducation.org
                  </a>
                </div>
              </div>

              {/* Department Desk */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] text-[#0B1F33] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#0B1F33] uppercase tracking-wider block">
                    Department Desk:
                  </span>
                  <p className="text-xs sm:text-sm text-[#1E40AF] font-medium">
                    +91 22 6730 8000 / 8106 / 8107
                  </p>
                </div>
              </div>

            </div>

            {/* Office Hours Box */}
            <div className="p-5 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] text-left space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#0B1F33]" />
                <span>Office Hours:</span>
              </div>
              <p className="text-xs font-semibold text-[#0B1F33]">
                Monday – Friday: 9:00 AM – 5:00 PM IST
              </p>
              <p className="text-[11px] text-[#1E40AF]">
                IT Department Faculty Lounge, 4th Floor
              </p>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: SEND INQUIRY FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-8 sm:p-10 shadow-[0_12px_35px_-8px_rgba(3,109,164,0.14)] space-y-6"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#0B1F33] uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-[#0B1F33]" />
                <span>TRANSMIT OFFICIAL MESSAGE</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] tracking-tight">
                Send Us an Inquiry
              </h2>
            </div>

            {/* Success Message Banner */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you for your message. Our team will get back to you as soon as possible.</span>
              </motion.div>
            )}

            {/* Graceful Mailto Fallback Banner */}
            {submitStatus === 'fallback' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#DBEAFE] border border-[#3B82F6]/40 text-[#0B1F33] text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm"
              >
                <Mail className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                <span>Automatic transmission was unavailable. Your email client has been opened to send this inquiry directly.</span>
              </motion.div>
            )}

            {/* Rate Limit Alert Banner */}
            {rateLimitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{rateLimitMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Invisible Honeypot Spam Protection (hidden from real users, detectable by bots) */}
              <div 
                className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden pointer-events-none" 
                aria-hidden="true" 
                tabIndex="-1"
              >
                <label htmlFor="website_url">Website URL (leave blank)</label>
                <input 
                  type="text" 
                  id="website_url" 
                  name="website_url" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />
              </div>

              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-fullName" className="font-mono text-xs font-bold text-[#0B1F33] block">
                    Full Name *
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Girik Shukla"
                    className={`w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-email" className="font-mono text-xs font-bold text-[#0B1F33] block">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. student@thakureducation.org"
                    className={`w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number (Optional) & Academic Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-phone" className="font-mono text-xs font-bold text-[#0B1F33] flex items-center justify-between">
                    <span>Phone Number</span>
                    <span className="text-[10px] text-[#1E40AF] font-normal uppercase tracking-wider">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-department" className="font-mono text-xs font-bold text-[#0B1F33] block">
                    Academic Department
                  </label>
                  <input
                    id="contact-department"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Information Technology"
                    className="w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border border-[#93C5FD] text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none focus:border-[#1D4ED8] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Inquiry Category & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-category" className="font-mono text-xs font-bold text-[#0B1F33] block">
                    Inquiry Category
                  </label>
                  <div className="relative">
                    <select
                      id="contact-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border border-[#93C5FD] text-[#0B1F33] text-base sm:text-sm font-medium focus:outline-none focus:border-[#1D4ED8] transition-colors appearance-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#0B1F33] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-subject" className="font-mono text-xs font-bold text-[#0B1F33] block">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Brief headline of your message"
                    className={`w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Message Details */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-message" className="font-mono text-xs font-bold text-[#0B1F33] block">
                  Message Details *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Provide detailed description of your request or collaboration proposal..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors resize-y ${
                    errors.message ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#FFD43B] text-[#0B1F33] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FFC71F] active:scale-[0.99] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Transmit Inquiry'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS (ACCORDION) ================= */}
        <section className="space-y-10 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block font-mono text-[11px] font-bold text-[#0B1F33] uppercase tracking-wider px-3 py-1 rounded-full bg-[#93C5FD] border border-[#3B82F6]/30">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0B1F33] uppercase tracking-tight">
              Chapter Membership & Operations
            </h2>
            <p className="text-xs sm:text-sm text-[#1E40AF] font-medium">
              Answers to common queries about ACM eligibility, hackathon participation, and publications.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/95 border-2 border-[#93C5FD] rounded-2xl overflow-hidden shadow-md hover:border-[#1D4ED8]/40 transition-all"
                >
                  <button
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-black text-base sm:text-lg text-[#0B1F33] cursor-pointer hover:text-[#1E40AF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#0B1F33] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1E40AF]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 border-t border-[#93C5FD] text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed text-left bg-[#DBEAFE]/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

    </div>
  );
}
