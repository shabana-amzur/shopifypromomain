import { Client } from 'pg';
import { Resend } from 'resend';
import { google } from 'googleapis';

const resend = new Resend(process.env.RESEND_API_KEY);

// Google Sheets integration
async function addToGoogleSheet(email, sourcePage, timestamp) {
  try {
    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      console.log('Google Sheets not configured, skipping...');
      return;
    }

    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:C', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, email, sourcePage || 'waitlist']],
      },
    });

    console.log('Successfully added to Google Sheet');
  } catch (error) {
    console.error('Failed to add to Google Sheet:', error.message);
    // Don't throw error - we don't want to fail the API call if Google Sheets fails
  }
}

async function sendResendNotification(to, subject, html) {
  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to,
    subject,
    html,
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

    // Add to Google Sheet
    const timestamp = new Date().toISOString();
    await addToGoogleSheet(email, sourcePage, timestamp);

    // Send thank you email to the user
    let userEmailError = null;
    try {
      console.log('Sending thank you email to user...');
      await sendResendNotification(
        email,
        'Thanks for Joining ShopifyPromoHub!',
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0A2540; margin-bottom: 20px;">Thank You for Joining the Waitlist!</h2>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              We're excited to have you on board! You're now part of an exclusive group getting early access to ShopifyPromoHub.
            </p>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              We'll keep you updated on our launch progress and let you know as soon as we're ready to welcome you.
            </p>
            <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Best regards,<br/>
              <strong>The ShopifyPromoHub Team</strong>
            </p>
          </div>
        `
      );
      console.log('Thank you email sent to user successfully');
    } catch (emailError) {
      console.error('User thank you email failed:', emailError);
      userEmailError = emailError.message || String(emailError);
    }

    // Send notification email if configured
    let emailNotificationError = null;
    if (process.env.NOTIFY_TO) {
      try {
        console.log('Sending notification email...');
        // Split NOTIFY_TO by comma to support multiple recipients
        const recipients = process.env.NOTIFY_TO.split(',').map(email => email.trim());
        
        await sendResendNotification(
          recipients,
          'New ShopifyPromo Waitlist Signup',
          `
            <p>New waitlist signup:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source page:</strong> ${sourcePage || 'waitlist'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          `
        );
        console.log('Notification email sent successfully to:', recipients.join(', '));
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
