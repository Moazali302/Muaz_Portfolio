const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Always save as resume.pdf (replace existing)
    cb(null, 'resume.pdf');
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept PDF files only
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload resume (protected)
router.post('/resume', authenticateToken, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'Resume uploaded successfully',
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download resume
router.get('/resume', (req, res) => {
  const resumePath = path.join(uploadsDir, 'resume.pdf');
  
  if (!fs.existsSync(resumePath)) {
    // Return a friendly error message instead of 404
    return res.status(404).json({ 
      error: 'Resume not found',
      message: 'Resume file is not available yet. Please contact directly via email.'
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=MoazAli_Resume.pdf');
  
  const fileStream = fs.createReadStream(resumePath);
  fileStream.pipe(res);
  
  fileStream.on('error', (err) => {
    console.error('Resume download error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download resume' });
    }
  });
});

module.exports = router;

