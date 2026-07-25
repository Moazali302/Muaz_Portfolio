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
    slug: 'locatehome',
    role: 'Frontend Developer',
    employmentType: 'Part-time',
    location: 'Remote',
    startDate: new Date('2026-02-01'),
    endDate: new Date('2026-03-29'),
    isCurrent: false,
    description:
      'Working as a Frontend Developer at LocateHome, building responsive, user-friendly interfaces for a real estate platform using Angular. Focused on bridging the gap between data-heavy features and seamless user experiences.',
    responsibilities: [
      'Developed responsive, pixel-perfect UI components using Angular and Tailwind CSS, ensuring consistency across mobile and desktop.',
      'Collaborated with backend engineers and product managers to translate property search requirements into intuitive interfaces.',
      'Optimized component structure and state handling to improve page load performance and reduce re-renders.',
      'Built reusable UI modules to speed up feature delivery across the platform.',
    ],
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
    companyUrl: '',
    order: 1,
  },
  {
    company: 'Taleem_Hub(Own-Project)',
    slug: 'taleem-hub',
    role: 'Full Stack Developer',
    employmentType: 'Part-time',
    location: 'Remote',
    startDate: new Date('2026-02-23'),
    isCurrent: true,
    description:
      'Working as a Full Stack Developer at Taleem_hub, building both frontend interfaces and backend APIs for an education-focused platform.',
    responsibilities: [
      'Designed and developed RESTful APIs using Node.js and Nest.js to support core platform features.',
      'Built responsive frontend interfaces in Angular, integrating them with backend services in real time.',
      'Managed MongoDB schemas and queries to support scalable data storage and retrieval.',
      'Worked across the full stack to debug issues, ensuring smooth communication between frontend and backend.',
    ],
    technologies: ['Angular', 'Nest.js', 'MongoDB'],
    companyUrl: '',
    order: 2,
  },
  {
    company: 'Soletech.customer-portal',
    slug: 'soletech-portals',
    role: 'Frontend Developer',
    employmentType: 'Full-time',
    location: 'Remote',
    startDate: new Date('2025-11-11'),
    isCurrent: true,
    description:
      'Working as a Frontend Developer at Soletechs, building a multi-portal enterprise ticketing system with hierarchical work items using Angular, TypeScript, and ag-Grid.',
    responsibilities: [
      'Built a multi-portal enterprise ticketing system (Admin, Partner, Customer) with hierarchical work items (Activity → Task → Subtask).',
      'Implemented full bilingual (English/Arabic) support via Transloco across forms, dialogs, and grid headers using a reusable translation pattern.',
      'Developed role-based access control (RBAC) to manage portal-specific views, permissions, and action menus.',
      'Fixed critical production bugs — real-time grid refresh failures, stale component state, and parent-child state propagation errors.',
      'Refactored core modules into standalone Angular components, resolving circular dependencies and improving code maintainability.',
    ],
    technologies: ['Angular', 'TypeScript', 'ag-Grid'],
    companyUrl: 'https://soletechs.net/customerportalnew.web',
    order: 3,
  },
  {
    company: 'Soletech.com',
    slug: 'soletechs-website',
    role: 'Frontend Developer',
    employmentType: 'Full-time',
    location: 'Remote',
    startDate: new Date('2025-11-11'),
    isCurrent: true,
    description:
      "Alongside the customer portal, worked as a Frontend Developer on Soletechs' official corporate website (soletechs.net), converting static content into a fully dynamic, API-driven experience.",
    responsibilities: [
      'Converted the corporate website from static content into a fully dynamic, API-driven website, integrating backend endpoints to serve real-time data.',
      'Implemented Base64 API integration for handling and rendering media/document content dynamically across the website.',
      'Translated key website content into Arabic, extending bilingual (English/Arabic) support across the platform.',
      'Maintained and updated the corporate website alongside the customer portal, ensuring consistent frontend architecture across both.',
    ],
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
    companyUrl: 'https://soletechs.com',
    order: 4,
  },
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
