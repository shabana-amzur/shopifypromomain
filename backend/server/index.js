
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

// MySQL config
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Nodemailer config
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/join-waitlist', async (req, res) => {
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

    // Send notification email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'shabana.sheik@amzur.com',
      subject: 'New Waitlist Signup',
      text: `New user joined the waitlist: ${email}`,
      html: `<p>New user joined the waitlist: <strong>${email}</strong></p>`
    });
    res.status(200).json({ message: 'Email submitted and stored successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Could not store or notify.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
