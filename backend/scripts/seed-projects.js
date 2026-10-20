const dns = require('dns');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/project');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const GITHUB = 'https://github.com/Moazali302';

const projects = [
  {
    name: 'FlyAviation CRM',
    slug: 'flyaviation-crm',
    category: 'Travel CRM',
    description:
      'Management platform for an Umrah travel agency: authentication journey, hotels, safe deletes and an activity feed.',
    techStack: ['Angular20+','Nestjs','Redix','PostgreSql','Signals', 'Tailwind'],
    images: [
      '/assets/projects/fly-aviation-login.png',
      '/assets/projects/fly-aviation-dashboard.png',
      '/assets/projects/fly-aviation-queries.png',
      '/assets/projects/fly-aviation-edit-query.png'
    ],
    featured: true,
    order: 1,
    caseStudy: {
      role: 'Frontend Developer',
      client: 'Umrah travel agency',
      overview:
        'FlyAviation Travel CRM is a management platform for an Umrah travel agency, covering the full authentication journey and day-to-day operations.',
      challenge:
        'Staff needed one place to manage users, queries and hotels, with a secure sign-in flow and a clear view of recent activity.',
      solution:
        'An Angular application built with signals and Tailwind design tokens, consuming REST APIs and following the approved design for every screen.',
      features: [
        { title: 'Authentication journey', description: 'Login, OTP verification, forgot and new password flows.' },
        { title: 'Hotels management', description: 'Hotel list and add hotel pages with toasts and animations.' },
        { title: 'Safe deletes', description: 'Confirmation dialog before deleting users, queries and hotels.' },
        {
          title: 'Activity feed',
          description: 'Dashboard shows the latest 5 activities; "See all" opens a side drawer with the full paginated list.'
        }
      ]
    }
  },
  {
    name: 'TaleemHub Portal',
    slug: 'taleemhub-portal',
    category: 'Education SaaS',
    description: 'Multi-tenant School & Academy Management SaaS for Pakistan.',
    techStack: ['Angular','MongooseDb','Database Sharding', 'TypeScript', 'Tailwind'],
    images: [
      '/assets/projects/taleem-hub-login.png',
      '/assets/projects/taleem-hub-dashboard.png',
      '/assets/projects/taleem-hub-school.png'
    ],
    githubUrl: `${GITHUB}/Taleem-Hub_portal`,
    featured: true,
    order: 2
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  for (const project of projects) {
    await Project.findOneAndUpdate({ slug: project.slug }, project, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });
  }

  console.log(`Seeded ${projects.length} projects`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());