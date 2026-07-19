const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Experience = require('../models/experience');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const experiences = [
  {
    company: 'LocateHome',
    role: 'Frontend Developer',
    employmentType: 'Full-time',
    location: 'Remote',
    startDate: new Date('2025-01-01'),
    isCurrent: true,
    description: 'Working as a Frontend Developer building responsive, user-friendly interfaces using Angular.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
    companyUrl: '',
    order: 1
  },
  {
    company: 'Taleem_hub',
    role: 'Full Stack Developer',
    employmentType: 'Full-time',
    location: 'Remote',
    startDate: new Date('2025-01-01'),
    isCurrent: true,
    description: 'Working as a Full Stack Developer, building both frontend interfaces and backend APIs.',
    technologies: ['Angular', 'Nest.js', 'MongoDB'],
    companyUrl: '',
    order: 2
  },
  {
    company: 'Soletech.com',
    role: 'Frontend Developer',
    employmentType: 'Full-time',
    location: 'Remote',
    startDate: new Date('2025-01-01'),
    isCurrent: true,
    description: 'Working as a Frontend Developer, developing modern web interfaces.',
    technologies: ['Angular', 'TypeScript'],
    companyUrl: '',
    order: 3
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Experience.deleteMany({});
    console.log('Old experience data cleared');

    const result = await Experience.insertMany(experiences);
    console.log(`${result.length} experience entries added successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();