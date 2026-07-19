const express = require('express');
const multer = require('multer');
const Resume = require('../models/Resume');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Multer: memory mein store karega (disk pe nahi), taake seedha DB mein bhej sakein
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload resume (protected) — database mein save karega
router.post('/resume', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Purana resume delete kar ke naya save karega (hamesha ek hi resume rakhna hai)
    await Resume.deleteMany({});

    const resume = new Resume({
      filename: req.file.originalname || 'MoazAli_Resume.pdf',
      contentType: req.file.mimetype,
      data: req.file.buffer
    });
    await resume.save();

    res.json({
      message: 'Resume uploaded successfully to database',
      filename: resume.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download resume — database se seedha serve karega
router.get('/resume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        error: 'Resume not found',
        message: 'Resume file is not available yet. Please contact directly via email.'
      });
    }

    res.setHeader('Content-Type', resume.contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${resume.filename}`);
    res.send(resume.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download resume' });
  }
});

module.exports = router;