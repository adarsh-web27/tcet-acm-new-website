import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { validateEmail, validatePhone, checkRateLimit, recordSubmission } from '../utils/contactValidation';
import { CONTACT_CATEGORIES, CONTACT_INFO_CARDS } from '../data/contactData';
import ContactFAQ from '../components/ContactFAQ';

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const formSectionRef = useRef(null);

  const typeParam = searchParams.get('type');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    category: typeParam === 'feedback' ? 'Student & Faculty Feedback' : 'General Inquiry',
    subject: typeParam === 'feedback' ? 'Student & Faculty Feedback' : '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | null
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const categories = CONTACT_CATEGORIES;
  const isFeedback = formData.category === 'Student & Faculty Feedback';

  // Auto-switch between Feedback & Inquiry modes when URL parameters or navigation changes
  useEffect(() => {
    if (typeParam === 'feedback') {
      setFormData(prev => ({
        ...prev,
        category: 'Student & Faculty Feedback',
        subject: prev.subject && prev.subject !== 'General Inquiry' ? prev.subject : 'Student & Faculty Feedback'
      }));
      const timer = setTimeout(() => {
        if (formSectionRef.current) {
          formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      // Switched to Contact Us / Enquiry mode (no type or type=enquiry / type=inquiry)
      setFormData(prev => ({
        ...prev,
        category: prev.category === 'Student & Faculty Feedback' ? 'General Inquiry' : prev.category,
        subject: prev.subject === 'Student & Faculty Feedback' ? '' : prev.subject
      }));
      const timer = setTimeout(() => {
        if (formSectionRef.current) {
          formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [typeParam, location.key]);

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

    const trimmedEmail = formData.email.trim();
    const formattedPhone = formData.phone.trim();
    const formattedDept = formData.department.trim();

    const payload = {
      fullName: trimmedName,
      email: trimmedEmail,
      phone: formattedPhone,
      department: formattedDept,
      category: formData.category,
      subject: trimmedSubject,
      message: trimmedMessage,
      honeypot: honeypot || ''
    };

    try {
      // 1. LOCAL DEVELOPMENT ENVIRONMENT:
      // Vite dev server does not run Vercel serverless functions locally.
      // Safely simulate success and log to console without triggering fallbacks or spamming inboxes.
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.info('🧪 [DEV MODE] Contact form submitted locally:', payload);
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
        return;
      }

      // 2. DEPLOYED PRODUCTION ENVIRONMENT (Vercel):
      // Clean boundary: Browser -> /api/contact -> api/contact.js -> FormSubmit
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Contact API returned a non-OK status.');
      }
    } catch (_err) {
      // Construct mailto link as graceful client fallback preserving user data
      const subjectEncoded = encodeURIComponent(`[TCET ACM SIGITE Inquiry] ${formData.category} — ${trimmedSubject}`);
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
            <span>Connect & Collaborate</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0B1F33] uppercase tracking-tight leading-[1.08]"
          >
            Connect with TCET ACM SIGITE
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#1E40AF] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Whether you’re a student, faculty member or external partner — this is the place to reach the TCET ACM team.
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
            {/* Header Title */}
            <div className="space-y-2.5">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] tracking-tight">
                {isFeedback ? 'Share Your Thoughts with TCET ACM SIGITE' : 'Talk to the TCET ACM team'}
              </h2>
              <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                {isFeedback ? (
                  "Your feedback helps us learn, improve, and create better experiences for our community. Whether it's a suggestion, appreciation, or idea for future initiatives, we'd love to hear from you."
                ) : (
                  <>
                    Drop us a mail, ping us on socials or catch us in the IT department. We’re always up for <strong className="font-bold text-[#0B1F33]">ideas, events and collaborations.</strong>
                  </>
                )}
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
                    On campus:
                  </span>
                  <p className="text-xs sm:text-sm text-[#1E40AF] font-medium leading-relaxed">
                    TCET • 2nd Floor • IT Staffroom
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
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tcetacm@thakureducation.org" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#0B1F33] font-bold hover:underline"
                    title="Send email via Gmail"
                  >
                    tcetacm@thakureducation.org
                  </a>
                </div>
              </div>

              {/* Call or text us */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] border border-[#93C5FD] text-[#0B1F33] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#0B1F33] uppercase tracking-wider block">
                    Call or text us on:
                  </span>
                  <p className="text-xs sm:text-sm text-[#0B1F33] font-bold">
                    <a href="tel:+919619903582" className="hover:underline">+91 96199 03582</a> / <a href="tel:+917304361777" className="hover:underline">+91 73043 61777</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Active Hours Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F33] border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium shadow-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Active on weekdays • 10 AM – 5 PM</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: SEND INQUIRY FORM */}
          <motion.div 
            ref={formSectionRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white/95 border-2 border-[#93C5FD] rounded-3xl p-8 sm:p-10 shadow-[0_12px_35px_-8px_rgba(3,109,164,0.14)] space-y-6 scroll-mt-28"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#93C5FD]/40">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#0B1F33] uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0B1F33]" />
                  <span>
                    {formData.category === 'Student & Faculty Feedback' 
                      ? 'STUDENT & FACULTY FEEDBACK' 
                      : 'TRANSMIT OFFICIAL MESSAGE'}
                  </span>
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B1F33] tracking-tight">
                  {formData.category === 'Student & Faculty Feedback' 
                    ? 'Share Your Feedback' 
                    : 'Send Us an Inquiry'}
                </h2>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="inline-flex p-1 bg-[#EFF6FF] rounded-2xl border border-[#93C5FD] shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSearchParams({});
                    setFormData(prev => ({
                      ...prev,
                      category: prev.category === 'Student & Faculty Feedback' ? 'General Inquiry' : prev.category,
                      subject: prev.subject === 'Student & Faculty Feedback' ? '' : prev.subject
                    }));
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formData.category !== 'Student & Faculty Feedback'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-[#1E40AF] hover:text-[#1D4ED8] hover:bg-white/60'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchParams({ type: 'feedback' });
                    setFormData(prev => ({
                      ...prev,
                      category: 'Student & Faculty Feedback',
                      subject: prev.subject && prev.subject !== 'General Inquiry' ? prev.subject : 'Student & Faculty Feedback'
                    }));
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formData.category === 'Student & Faculty Feedback'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-[#1E40AF] hover:text-[#1D4ED8] hover:bg-white/60'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Feedback</span>
                </button>
              </div>
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
                    <p className="text-xs font-semibold text-rose-600 mt-1">{errors.fullName}</p>
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
                    <p className="text-xs font-semibold text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number (Optional) & Academic Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-phone" className="font-mono text-xs font-bold text-[#0B1F33] flex items-center justify-between">
                    <span>Phone Number</span>
                    <span className="text-xs text-[#1E40AF] font-normal uppercase tracking-wider">(Optional)</span>
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
                    <p className="text-xs font-semibold text-rose-600 mt-1">{errors.phone}</p>
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
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value === 'Student & Faculty Feedback') {
                          setSearchParams({ type: 'feedback' });
                        } else if (searchParams.get('type') === 'feedback') {
                          setSearchParams({});
                        }
                      }}
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
                    placeholder={
                      formData.category === 'Student & Faculty Feedback'
                        ? "e.g. Workshop suggestion, Chapter feedback, Event ideas"
                        : "Brief headline of your message"
                    }
                    className={`w-full min-h-[46px] sm:min-h-[48px] px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs font-semibold text-rose-600 mt-1">{errors.subject}</p>
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
                  placeholder={
                    formData.category === 'Student & Faculty Feedback'
                      ? "Share your feedback, ideas, or recommendations for TCET ACM SIGITE activities..."
                      : "Provide detailed description of your request or collaboration proposal..."
                  }
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#EFF6FF] border text-[#0B1F33] placeholder-[#3B82F6]/60 text-base sm:text-sm font-medium focus:outline-none transition-colors resize-y ${
                    errors.message ? 'border-rose-500 focus:border-rose-600' : 'border-[#93C5FD] focus:border-[#1D4ED8]'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs font-semibold text-rose-600 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#FFD43B] text-[#0B1F33] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FFC71F] active:scale-[0.99] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting 
                    ? 'Transmitting...' 
                    : formData.category === 'Student & Faculty Feedback'
                      ? 'Submit Feedback'
                      : 'Transmit Inquiry'}
                </span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS (ACCORDION) ================= */}
        <ContactFAQ />

      </div>

    </div>
  );
}
