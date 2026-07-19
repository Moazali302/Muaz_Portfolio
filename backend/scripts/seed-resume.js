const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const RESUME_FILE_PATH = 'C:\\Users\\Naveed Computer\\Downloads\\MoazAli-frontend-resume.pdf.pdf';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    if (!fs.existsSync(RESUME_FILE_PATH)) {
      console.error('Resume file not found at:', RESUME_FILE_PATH);
      process.exit(1);
    }

    const fileData = fs.readFileSync(RESUME_FILE_PATH);

    await Resume.deleteMany({});
    const resume = new Resume({
      filename: 'MoazAli_Resume.pdf',
      contentType: 'application/pdf',
      data: fileData
    });
    await resume.save();

    console.log('Resume uploaded to database successfully');
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
}

seed();