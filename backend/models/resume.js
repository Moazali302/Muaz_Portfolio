const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    default: 'MoazAli_Resume.pdf'
  },
  contentType: {
    type: String,
    default: 'application/pdf'
  },
  data: {
    type: Buffer,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);