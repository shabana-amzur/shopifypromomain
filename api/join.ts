import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, sourcePage } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    await client.query(
      `INSERT INTO subscribers (email, source_page)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [email, sourcePage || null]
    );

    await client.end();

    const notifyTo = process.env.NOTIFY_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (notifyTo) {
      await transporter.sendMail({
        from,
        to: notifyTo,
        subject: 'New ShopifyPromo Waitlist Signup',
        html: `
          <p>New waitlist signup:</p>
          <p><strong>Email:</strong> ${email}</p>
          ${sourcePage ? `<p><strong>Source page:</strong> ${sourcePage}</p>` : ''}
          <p>Time: ${new Date().toISOString()}</p>
        `,
      });
    }

    return res.status(200).json({ message: 'Subscribed successfully.' });
  } catch (error) {
    console.error('Error in /api/join:', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
}
