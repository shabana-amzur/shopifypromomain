// Node.js Express-style API route for Vercel/Netlify or your own server
// Requires: mysql2, nodemailer

const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

// Configure your MySQL connection
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Configure your email transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // Store email in MySQL
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('CREATE TABLE IF NOT EXISTS waitlist_emails (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
    await connection.execute('INSERT IGNORE INTO waitlist_emails (email) VALUES (?)', [email]);
    await connection.end();

    // Send notification email to you
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL, // your email address
      subject: 'New Waitlist Signup',
      text: `New email submitted: ${email}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
