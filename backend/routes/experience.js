const express = require('express');
const Experience = require('../models/Experience');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ===== Get all experiences (public) =====
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// ===== Get single experience =====
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// ===== Create experience (protected — admin only) =====
router.post('/', authenticateToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message });
  }
});

// ===== Update experience (protected) =====
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message });
  }
});

// ===== Delete experience (protected) =====
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;