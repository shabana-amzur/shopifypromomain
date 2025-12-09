import nodemailer from 'nodemailer';

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: 'shabana.sheik@amzur.com',
      pass: 'iaaedtgskgoufpoe',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'shabana.sheik@amzur.com',
      to: 'shabana.sheik@amzur.com',
      subject: 'SMTP Test from Node.js',
      text: 'This is a test email sent from a Node.js script using your current SMTP credentials.',
    });
    console.log('✅ Email sent! Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

testSMTP();
