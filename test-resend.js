import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  try {
    console.log('🔑 Testing Resend API...');
    console.log('API Key:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
    console.log('From:', process.env.RESEND_FROM || 'Missing');
    console.log('To:', process.env.NOTIFY_TO || 'Missing');
    
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set');
      return;
    }
    
    if (!process.env.RESEND_FROM) {
      console.error('❌ RESEND_FROM is not set');
      return;
    }
    
    if (!process.env.NOTIFY_TO) {
      console.error('❌ NOTIFY_TO is not set');
      return;
    }
    
    console.log('\n📧 Sending test email...');
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.NOTIFY_TO,
      subject: 'Test Email from ShopifyPromo',
      html: '<p>This is a test email to verify Resend is working.</p>',
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Result:', result);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', error.message);
  }
}

testResend();
