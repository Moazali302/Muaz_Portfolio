const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

// Helper to get cities for a country
async function getCitiesForCountry(country) {
  try {
    // Using REST Countries API to get country info, then use a cities API
    // For now, we'll use a simple mapping or external API
    // You can replace this with your preferred cities API
    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/cities`, {
      headers: {
        'X-CSCAPI-KEY': process.env.COUNTRY_API_KEY || ''
      }
    });
    return response.data.map(city => city.name);
  } catch (error) {
    // Fallback: return empty array or stub data
    return [];
  }
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, country, city } = req.body;

    if (!username || !email || !password || !country || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, email, password, country, city });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      country: req.user.country,
      city: req.user.city,
      role: req.user.role
    }
  });
});

// Get cities for country (helper endpoint)
router.get('/cities/:country', async (req, res) => {
  try {
    const cities = await getCitiesForCountry(req.params.country);
    res.json({ cities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

