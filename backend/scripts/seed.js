const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Blog = require('../models/Blog');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123', // Change this in production!
        country: 'Pakistan',
        city: 'Islamabad',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created:', admin.email);
    } else {
      console.log('Admin user already exists');
    }

    // Create sample blog post
    const blogExists = await Blog.findOne({ slug: 'welcome-to-my-portfolio' });
    if (!blogExists) {
      const blog = new Blog({
        title: 'Welcome to My Portfolio',
        slug: 'welcome-to-my-portfolio',
        excerpt: 'Welcome to my portfolio website! Here you can find my projects, blog posts, and ways to get in touch.',
        body: `# Welcome to My Portfolio

This is a sample blog post to demonstrate the blog functionality of the portfolio website.

## About Me

I'm MoazAli, a student at Riphah International University (2022–2026), passionate about web development and software engineering.

## What You'll Find Here

- **Projects**: Check out my GitHub repositories and projects
- **Blog**: Read about my experiences, tutorials, and thoughts
- **Contact**: Reach out if you'd like to collaborate or have questions

Thanks for visiting!`,
        tags: ['welcome', 'introduction'],
        published: true
      });
      await blog.save();
      console.log('Sample blog post created');
    } else {
      console.log('Sample blog post already exists');
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();

