export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      department,
      category,
      subject,
      message,
      honeypot
    } = req.body || {};

    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Message received successfully.'
      });
    }

    const cleanName = (fullName || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanPhone = (phone || '').trim();
    const cleanDept = (department || '').trim();
    const cleanCategory = (category || 'General Inquiry').trim();
    const cleanSubject = (subject || '').trim();
    const cleanMessage = (message || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!cleanSubject || cleanSubject.length < 3) {
      return res.status(400).json({ success: false, error: 'Subject must be at least 3 characters.' });
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });
    }

    const forwardResponse = await fetch('https://formsubmit.co/ajax/tcetacm@thakureducation.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
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
      })
    });

    if (forwardResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted to TCET ACM SIGITE successfully.'
      });
    } else {
      const forwardErr = await forwardResponse.json().catch(() => ({}));
      return res.status(502).json({
        success: false,
        error: forwardErr.message || 'Upstream notification failed. Please try direct email.'
      });
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.'
    });
  }
}
