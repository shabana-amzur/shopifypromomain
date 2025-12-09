import { Client } from 'pg';
import { google } from 'googleapis';
import fs from 'fs';

// Load OAuth2 credentials and token
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const TOKEN_PATH = 'gmail-token.json';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
oAuth2Client.setCredentials(token);

async function sendGmailNotification(to, subject, html) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const messageParts = [
    `From: "ShopifyPromo" <${process.env.GMAIL_USER}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ];
  const message = messageParts.join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
}

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('API called with body:', req.body);
    console.log('Environment check:', {
      DATABASE_URL: process.env.DATABASE_URL ? 'Available' : 'Missing',
      SMTP_HOST: process.env.SMTP_HOST ? 'Available' : 'Missing',
      SMTP_USER: process.env.SMTP_USER ? 'Available' : 'Missing',
      NOTIFY_TO: process.env.NOTIFY_TO ? 'Available' : 'Missing'
    });

    const { email, sourcePage } = req.body || {};

    if (!email || typeof email !== 'string') {
      console.log('Email validation failed:', email);
      return res.status(400).json({ message: 'Email is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email format validation failed:', email);
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Check database URL
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not configured');
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    console.log('Connecting to database...');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return res.status(500).json({ 
        message: 'Database connection failed. Please try again later.',
        error: dbError.message,
        code: dbError.code
      });
    }

    const result = await client.query(
      `INSERT INTO subscribers (email, source_page)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email, sourcePage || 'waitlist']
    );

    await client.end();
    console.log('Database operation completed, rows affected:', result.rowCount);

    // Send notification email if configured
    let emailNotificationError = null;
    if (process.env.NOTIFY_TO) {
      try {
        console.log('Sending notification email...');
        await sendGmailNotification(
          process.env.NOTIFY_TO,
          'New ShopifyPromo Waitlist Signup',
          `
            <p>New waitlist signup:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source page:</strong> ${sourcePage || 'waitlist'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          `
        );
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        emailNotificationError = emailError.message || String(emailError);
      }
    }

    return res.status(200).json({ 
      message: 'Subscribed successfully.',
      success: true,
      emailNotificationError // will be null if no error, or error message if failed
    });

  } catch (error) {
    console.error('Error in /api/join:', error);
    
    // Return proper JSON error response
    return res.status(500).json({ 
      message: 'Something went wrong. Please try again.',
      error: error.message 
    });
  }
};
