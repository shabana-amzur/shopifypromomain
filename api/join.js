import { Client } from 'pg';
import { Resend } from 'resend';
import { google } from 'googleapis';

const resend = new Resend(process.env.RESEND_API_KEY);

function toNullable(value) {
  if (!value) {
    return null;
  }
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
}

function deriveTrafficSource(utmSource, refererUrl) {
  if (utmSource && utmSource.trim() !== '') {
    return utmSource;
  }

  if (refererUrl) {
    try {
      const url = new URL(refererUrl);
      return url.hostname.replace(/^www\./, '');
    } catch (error) {
      return 'referral';
    }
  }

  return 'direct';
}

// Google Sheets integration
async function addToGoogleSheet(email, sourcePage, timestamp, trackingSummary) {
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

    const {
      trafficSource,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      refererUrl,
      landingPage,
    } = trackingSummary;
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:K', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          email,
          sourcePage || 'waitlist',
          trafficSource || '',
          utmSource || '',
          utmMedium || '',
          utmCampaign || '',
          utmTerm || '',
          utmContent || '',
          refererUrl || '',
          landingPage || '',
        ]],
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

    const { email, sourcePage, tracking } = req.body || {};

    const {
      utmSource = '',
      utmMedium = '',
      utmCampaign = '',
      utmTerm = '',
      utmContent = '',
      referrer = '',
      landingPage = '',
    } = tracking || {};

    const refererHeader = req.headers['referer'] || req.headers['referrer'];
    const refererUrl = referrer || (typeof refererHeader === 'string' ? refererHeader : '');
    const trafficSource = deriveTrafficSource(utmSource, refererUrl);
    const trackingSummary = {
      trafficSource,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      refererUrl,
      landingPage,
    };

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
      `INSERT INTO subscribers (
         email,
         source_page,
         traffic_source,
         referer_url,
         utm_source,
         utm_medium,
         utm_campaign,
         utm_term,
         utm_content,
         landing_page
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (email) DO UPDATE
         SET source_page = EXCLUDED.source_page,
             traffic_source = COALESCE(EXCLUDED.traffic_source, subscribers.traffic_source),
             referer_url = COALESCE(EXCLUDED.referer_url, subscribers.referer_url),
             utm_source = COALESCE(EXCLUDED.utm_source, subscribers.utm_source),
             utm_medium = COALESCE(EXCLUDED.utm_medium, subscribers.utm_medium),
             utm_campaign = COALESCE(EXCLUDED.utm_campaign, subscribers.utm_campaign),
             utm_term = COALESCE(EXCLUDED.utm_term, subscribers.utm_term),
             utm_content = COALESCE(EXCLUDED.utm_content, subscribers.utm_content),
             landing_page = COALESCE(EXCLUDED.landing_page, subscribers.landing_page),
             updated_at = NOW()
       RETURNING id`,
      [
        email,
        sourcePage || 'waitlist',
        toNullable(trafficSource),
        toNullable(refererUrl),
        toNullable(utmSource),
        toNullable(utmMedium),
        toNullable(utmCampaign),
        toNullable(utmTerm),
        toNullable(utmContent),
        toNullable(landingPage),
      ]
    );

    await client.end();
    console.log('Database operation completed, rows affected:', result.rowCount);

    // Add to Google Sheet
    const timestamp = new Date().toISOString();
    await addToGoogleSheet(email, sourcePage, timestamp, trackingSummary);

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
            <p><strong>Traffic source:</strong> ${trackingSummary.trafficSource || 'unknown'}</p>
            <p><strong>UTM Source:</strong> ${trackingSummary.utmSource || 'n/a'}</p>
            <p><strong>UTM Medium:</strong> ${trackingSummary.utmMedium || 'n/a'}</p>
            <p><strong>UTM Campaign:</strong> ${trackingSummary.utmCampaign || 'n/a'}</p>
            <p><strong>UTM Term:</strong> ${trackingSummary.utmTerm || 'n/a'}</p>
            <p><strong>UTM Content:</strong> ${trackingSummary.utmContent || 'n/a'}</p>
            <p><strong>Referer:</strong> ${trackingSummary.refererUrl || 'n/a'}</p>
            <p><strong>Landing Page:</strong> ${trackingSummary.landingPage || 'n/a'}</p>
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
