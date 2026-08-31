const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @param {Object} options
 * @param {string} options.to - Receiver email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML body
 * @param {string} [options.replyTo] - Reply-to email (optional)
 */
async function sendEmail({ to, subject, html, replyTo }) {
  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'moazdev047@gmail.com',
      to,
      subject,
      html,
      ...(replyTo && { reply_to: replyTo }),
    });
    console.log('Email sent:', result.data?.id);
    return { success: true, data: result };
  } catch (error) {
    console.error('Email send failed:', error.message);
    return { success: false, error: error.message };
  }
}

function buildContactEmailHtml({ name, email, message }) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;
}

module.exports = { sendEmail, buildContactEmailHtml };