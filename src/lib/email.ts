/**
 * Email utility using Nodemailer.
 *
 * LOCAL / COLLEGE MODE:
 *   If SMTP_USER is not set, Ethereal Email is used automatically.
 *   A preview URL is logged to the console — open it to see the email.
 *   No real emails are sent. No account or API key needed.
 *
 * PRODUCTION MODE:
 *   Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env to use
 *   any real SMTP provider (Gmail App Password, Mailtrap, etc.)
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let _transporter: Transporter | null = null;

async function getTransporter(): Promise<Transporter> {
    if (_transporter) return _transporter;

    if (process.env.SMTP_USER) {
        // Real SMTP (Gmail etc.) — credentials from .env
        _transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        console.log("📧 Email: Using real SMTP →", process.env.SMTP_HOST);
    } else {
        // Ethereal Email — auto-creates a free test account, no setup needed
        const testAccount = await nodemailer.createTestAccount();
        _transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log("📧 Email: Using Ethereal test account →", testAccount.user);
    }

    return _transporter;
}

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

const BASE_HTML = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Roboto', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%); padding: 30px 40px; text-align: center; }
    .header h1 { color: #e2b96f; margin: 0; font-size: 24px; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 12px; }
    .body { padding: 40px; color: #333; line-height: 1.7; }
    .body h2 { color: #1a1a2e; margin-top: 0; }
    .cta { display: inline-block; background: #e2b96f; color: #1a1a2e; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 700; margin: 20px 0; }
    .footer { background: #f8f8f8; padding: 20px 40px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🏺 VAULT</h1>
      <p>Luxury Antique E-Auction Platform</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} VAULT Auctions • Pune, Maharashtra</p>
      <p>You received this email because you have an account with VAULT.</p>
    </div>
  </div>
</body>
</html>
`;

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<void> {
    const transporter = await getTransporter();
    const from = process.env.SMTP_FROM || '"VAULT Auctions" <noreply@vault.local>';

    const info = await transporter.sendMail({
        from,
        to,
        subject,
        html: BASE_HTML(html),
        text: text ?? html.replace(/<[^>]+>/g, ""),
    });

    // In local/Ethereal mode, log the preview URL so you can see the email
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
        console.log(`📧 Email preview URL → ${previewUrl}`);
    } else {
        console.log(`📧 Email sent to ${to} (Message ID: ${info.messageId})`);
    }
}
