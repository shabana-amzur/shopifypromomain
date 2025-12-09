module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  return res.status(200).json({ 
    message: 'API is working!',
    method: req.method,
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
      SMTP_HOST: process.env.SMTP_HOST ? 'Set' : 'Missing',
      SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Missing',
      SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Missing',
      NOTIFY_TO: process.env.NOTIFY_TO ? 'Set' : 'Missing'
    }
  });
};
