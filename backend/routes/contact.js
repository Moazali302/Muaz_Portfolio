const express = require('express');
const Contact = require('../models/Contact');
const { sendEmail, buildContactEmailHtml } = require('../services/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({
      message: 'Contact message sent successfully',
      id: contact._id
    });

    sendEmail({
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: buildContactEmailHtml({ name, email, message }),
      replyTo: email,
    });

  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;