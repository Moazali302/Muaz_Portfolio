const express = require('express');
const Project = require('../models/project');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const MAX_LIMIT = 50;

// ===== Get projects (public). Optional: ?featured=true&limit=3 =====
router.get('/', async (req, res) => {
  try {
    const filter = req.query.featured === 'true' ? { featured: true } : {};
    const requested = parseInt(req.query.limit, 10);
    const limit = Number.isNaN(requested) ? MAX_LIMIT : Math.min(Math.max(requested, 1), MAX_LIMIT);

    const projects = await Project.find(filter)
      .select('-caseStudy') // keep list responses light
      .sort({ order: 1, createdAt: -1 })
      .limit(limit);

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// ===== Get single project with case study by slug (public) =====
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// ===== Create project (protected — admin only) =====
router.post('/', authenticateToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message });
  }
});

// ===== Update project (protected) =====
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message });
  }
});

// ===== Delete project (protected) =====
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;