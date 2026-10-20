const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { _id: false }
);

// Optional long-form content used by the case study page
const caseStudySchema = new mongoose.Schema(
  {
    role: { type: String, trim: true },
    timeline: { type: String, trim: true },
    client: { type: String, trim: true },
    overview: { type: String, trim: true },
    challenge: { type: String, trim: true },
    solution: { type: String, trim: true },
    features: [featureSchema],
    gallery: [{ type: String, trim: true }]
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true, lowercase: true },
    category: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    coverImage: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }, // manually control display order
    caseStudy: caseStudySchema
  },
  { timestamps: true }
);

// Auto-generate slug from the project name if not explicitly provided
projectSchema.pre('validate', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

module.exports = mongoose.model('Project', projectSchema);