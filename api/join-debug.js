import { Client } from 'pg';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'CORS OK' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Log everything for debugging
    console.log('=== DEBUG START ===');
    console.log('Request method:', req.method);
    console.log('Request body:', req.body);
    console.log('Environment variables check:', {
      DATABASE_URL: process.env.DATABASE_URL ? 'Available' : 'Missing',
      SMTP_HOST: process.env.SMTP_HOST ? 'Available' : 'Missing',
      SMTP_USER: process.env.SMTP_USER ? 'Available' : 'Missing',
      NOTIFY_TO: process.env.NOTIFY_TO ? 'Available' : 'Missing'
    });

    const { email, sourcePage } = req.body || {};
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        received: { email, sourcePage }
      });
    }

    // Test database connection first
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'Database configuration missing',
        message: 'DATABASE_URL environment variable not set'
      });
    }

    // Try to connect to database
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    console.log('Attempting database connection...');
    await client.connect();
    console.log('Database connected successfully');

    // Try the insert operation
    const result = await client.query(
      `INSERT INTO subscribers (email, source_page)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email, sourcePage || 'waitlist']
    );

    await client.end();
    console.log('Database operation completed');
    console.log('=== DEBUG END ===');

    return res.status(200).json({ 
      success: true,
      message: 'Subscribed successfully',
      debug: {
        email,
        sourcePage: sourcePage || 'waitlist',
        rowsAffected: result.rowCount,
        wasNewSignup: result.rowCount > 0
      }
    });

  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    console.error('=== ERROR END ===');
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      type: error.name
    });
  }
};
