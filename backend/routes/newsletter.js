const express = require('express');
const Newsletter = require('../models/Newsletter');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email already exists
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.active) {
        return res.status(400).json({ error: 'Email already subscribed' });
      } else {
        // Reactivate
        existing.active = true;
        await existing.save();
        return res.json({ message: 'Successfully re-subscribed to newsletter' });
      }
    }

    const subscriber = new Newsletter({ email: email.toLowerCase() });
    await subscriber.save();

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Unsubscribe (optional endpoint)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (!subscriber) {
      return res.status(404).json({ error: 'Email not found' });
    }

    subscriber.active = false;
    await subscriber.save();

    res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

