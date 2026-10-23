import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Resend API Middleware Plugin for Vite Dev & Preview Servers
 * Intercepts POST /api/contact to send emails via Resend server-side.
 */
function resendApiPlugin() {
  const handleApiRequest = async (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : '';
    if (req.method === 'POST' && (url === '/api/contact' || url === '/api/enquire')) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const { fullName, email, company, service, timeline, description } = parsed;

          if (!fullName || !email || !description) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Full name, email, and description are required.' }));
            return;
          }

          const apiKey = process.env.RESEND_API_KEY;
          const toEmail = process.env.RESEND_TO_EMAIL;
          const fromEmail = process.env.RESEND_FROM_EMAIL;

          if (!apiKey || !toEmail || !fromEmail) {
            console.error('Resend is not configured. Set RESEND_API_KEY, RESEND_TO_EMAIL, and RESEND_FROM_EMAIL.');
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Email service is not configured.' }));
            return;
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
            res.statusCode = resendResponse.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: result.message || 'Resend error' }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, id: result.id }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'resend-api-middleware',
    configureServer(server) {
      server.middlewares.use(handleApiRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest);
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  if (env.RESEND_TO_EMAIL) process.env.RESEND_TO_EMAIL = env.RESEND_TO_EMAIL;
  if (env.RESEND_FROM_EMAIL) process.env.RESEND_FROM_EMAIL = env.RESEND_FROM_EMAIL;

  return {
    plugins: [
      react(),
      tailwindcss(),
      resendApiPlugin()
    ]
  };
});
