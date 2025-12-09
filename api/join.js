const { Client } = require('pg');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async function handler(req, res) {
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

  console.log('API called with body:', req.body);

  try {
    const { email, sourcePage } = req.body;

    if (!email || typeof email !== 'string') {
      console.log('Email validation failed:', email);
      return res.status(400).json({ message: 'Email is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email format validation failed:', email);
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    console.log('Connecting to database...');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    console.log('Database connected successfully');

    const result = await client.query(
      `INSERT INTO subscribers (email, source_page)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email, sourcePage || null]
    );

    await client.end();
    console.log('Database operation completed, rows affected:', result.rowCount);

    const notifyTo = process.env.NOTIFY_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (notifyTo) {
      console.log('Sending notification email...');
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
      console.log('Notification email sent successfully');
    }

    return res.status(200).json({ 
      message: 'Subscribed successfully.',
      success: true 
    });
  } catch (error) {
    console.error('Error in /api/join:', error);
    
    // More specific error messages
    if (error.message?.includes('connect')) {
      return res.status(500).json({ message: 'Database connection failed.' });
    } else if (error.message?.includes('SMTP') || error.message?.includes('mail')) {
      return res.status(500).json({ message: 'Email notification failed, but signup was recorded.' });
    } else {
      return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  }
};
