export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Check environment variables first
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set (length: ' + process.env.DATABASE_URL.length + ')' : 'Missing',
      SMTP_HOST: process.env.SMTP_HOST ? 'Set' : 'Missing',
      SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Missing',
      SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Missing',
      NOTIFY_TO: process.env.NOTIFY_TO ? 'Set' : 'Missing'
    };

    // Test database connection without importing pg initially
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'DATABASE_URL not configured',
        env: envCheck
      });
    }

    // Try to parse the DATABASE_URL to check format
    let dbUrl;
    try {
      dbUrl = new URL(process.env.DATABASE_URL);
    } catch (urlError) {
      return res.status(500).json({
        error: 'Invalid DATABASE_URL format',
        message: urlError.message,
        env: envCheck
      });
    }

    // Try importing pg and connecting
    const { Client } = await import('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    
    // Test a simple query
    const result = await client.query('SELECT NOW() as current_time');
    await client.end();

    return res.status(200).json({ 
      success: true,
      message: 'Database connection successful',
      currentTime: result.rows[0].current_time,
      env: envCheck
    });

  } catch (error) {
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message,
      code: error.code,
      detail: error.detail
    });
  }
}
