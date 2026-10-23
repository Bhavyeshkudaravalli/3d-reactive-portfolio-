/**
 * SERVERLESS FUNCTION HANDLER (/api/contact)
 * 
 * Works automatically on Vercel, Netlify, and Node serverless runtimes.
 * Dispatches project inquiries directly to Bhavyesh via the Resend API.
 */

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName, email, company, service, timeline, description } = body;

    if (!fullName || !email || !description) {
      return res.status(400).json({ error: 'Full name, email, and description are required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error('Resend is not configured. Set RESEND_API_KEY, RESEND_TO_EMAIL, and RESEND_FROM_EMAIL.');
      return res.status(500).json({ error: 'Email service is not configured.' });
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b0f17; color: #f1f5f9; border-radius: 12px; border: 1px solid #1e293b;">
        <div style="border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 20px;">New Project Inquiry</h2>
          <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via Bhavyesh Kuduravalli's Portfolio Website</p>
        </div>

        <div style="background-color: #131b2e; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Client Name:</strong> <span style="color: #e2e8f0;">${fullName}</span></p>
          <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
          <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Company / Brand:</strong> <span style="color: #cbd5e1;">${company || 'Not specified'}</span></p>
          <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Requested Service:</strong> <span style="color: #a78bfa; font-weight: 600;">${service}</span></p>
          <p style="margin: 0; font-size: 14px;"><strong>Preferred Timeline:</strong> <span style="color: #34d399;">${timeline || 'Flexible'}</span></p>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #cbd5e1; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Project Description:</h3>
          <div style="background-color: #0f172a; border-left: 3px solid #38bdf8; padding: 12px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${description}</div>
        </div>

        <div style="border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
          <p style="margin: 0;">You can reply directly to this email to contact <strong>${fullName}</strong> at <a href="mailto:${email}" style="color: #38bdf8;">${email}</a>.</p>
        </div>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject: `New Project Inquiry: ${service} - ${fullName}`,
        html: htmlContent
      })
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', result);
      return res.status(resendResponse.status).json({
        error: result.message || 'Failed to dispatch email via Resend'
      });
    }

    return res.status(200).json({
      success: true,
      id: result.id,
      message: 'Inquiry email sent successfully via Resend'
    });

  } catch (err) {
    console.error('Internal handler error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
