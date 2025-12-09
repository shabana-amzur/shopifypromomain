const { Client } = require('pg');
const nodemailer = require('nodemailer');

// Create transporter only if SMTP env vars are available
let transporter = null;
try {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
} catch (err) {
  console.error('SMTP setup failed:', err);
}

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

    await client.connect();
    console.log('Database connected successfully');

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
    if (transporter && process.env.NOTIFY_TO) {
      try {
        console.log('Sending notification email...');
        await transporter.sendMail({
          from: `"ShopifyPromo" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_TO,
          subject: 'New ShopifyPromo Waitlist Signup',
          html: `
            <p>New waitlist signup:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source page:</strong> ${sourcePage || 'waitlist'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          `,
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails - user signup is more important
      }
    }

    return res.status(200).json({ 
      message: 'Subscribed successfully.',
      success: true 
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
