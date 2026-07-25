const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    default: 'Full-time'
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null // null means "Present"
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  companyUrl: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0 // manually control display order
  }
}, {
  timestamps: true
});

// Auto-generate slug from company name if not explicitly provided
experienceSchema.pre('validate', function (next) {
  if (!this.slug && this.company) {
    this.slug = this.company
      .toLowerCase()
      .trim()
      .replace(/\.[a-z]+$/i, '')     // drop trailing domain-like suffix e.g. ".com"
      .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric -> hyphen
      .replace(/^-+|-+$/g, '');      // trim leading/trailing hyphens
  }
  next();
});

module.exports = mongoose.model('Experience', experienceSchema);