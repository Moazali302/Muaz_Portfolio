# MoazAli Portfolio - Full Stack Portfolio Web Application

A production-ready, single-page portfolio web application built with Angular 20, Tailwind CSS v4.2, Node.js, Express, and MongoDB.

## 🚀 Features

- **Modern UI/UX**: Premium, colorful design with dark/light theme toggle
- **Multilingual Support**: English and Urdu (Roman Urdu) language support
- **Responsive Design**: Fully responsive, mobile-first design
- **Project Showcase**: Fetches and displays GitHub repositories dynamically
- **Blog CMS**: Create, read, update blog posts with markdown support
- **Contact Form**: Send messages with email notifications
- **Newsletter**: Subscribe to newsletter functionality
- **Resume Management**: Upload and download resume (PDF)
- **Authentication**: JWT-based authentication with signup/login
- **SEO Optimized**: Meta tags, sitemap, and robots.txt

## 📋 Tech Stack

### Frontend
- Angular 20
- TypeScript
- Tailwind CSS v4.2
- RxJS
- Angular Router (lazy-loaded routes)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Nodemailer (email notifications)
- Bcrypt (password hashing)

## 📁 Project Structure

```
Muaz_Portfolio/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Blog.js           # Blog post model
│   │   ├── Contact.js        # Contact message model
│   │   └── Newsletter.js     # Newsletter subscriber model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── blog.js            # Blog routes
│   │   ├── contact.js        # Contact routes
│   │   ├── github.js         # GitHub API proxy routes
│   │   ├── newsletter.js     # Newsletter routes
│   │   └── upload.js         # File upload routes
│   ├── scripts/
│   │   └── seed.js           # Database seeding script
│   ├── uploads/              # Uploaded files directory
│   ├── server.js             # Express server entry point
│   └── package.json
├── frontend/
│   └── portfolio-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/    # Angular components
│       │   │   ├── services/      # Angular services
│       │   │   └── ...
│       │   └── ...
│       └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or pnpm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory. You can copy from the root `.env.example`:
   - On Windows: `copy ..\\.env.example backend\.env`
   - On Linux/Mac: `cp .env.example backend/.env`
   
   Then update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
   JWT_SECRET=your-secret-key-here-change-in-production
   PORT=3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   COUNTRY_API_KEY=your-country-api-key-optional
   ```

5. Seed the database (creates admin user and sample blog post):
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/portfolio-app
```

2. Install dependencies:
```bash
npm install
```

3. Update `src/environments/environment.ts` if needed (API URL should point to backend)

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:4202`

### Running Both Servers Concurrently

**Option 1: Run separately (recommended for development)**

Open two terminal windows:
- Terminal 1: `cd backend && npm run dev` (runs on port 3000)
- Terminal 2: `cd frontend/portfolio-app && npm start` (runs on port 4202)

**Option 2: Use a process manager like `concurrently`**

Install concurrently globally:
```bash
npm install -g concurrently
```

Then from the project root:
```bash
concurrently "cd backend && npm run dev" "cd frontend/portfolio-app && npm start"
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/cities/:country` - Get cities for a country

### GitHub
- `GET /api/github/repos` - Get all repositories for Moazali302
- `GET /api/github/repo/:owner/:repo/readme` - Get README for a repository

### Blog
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `POST /api/blog` - Create blog post (protected)
- `PUT /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all contact messages (admin)

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Upload
- `POST /api/upload/resume` - Upload resume (protected)
- `GET /api/upload/resume` - Download resume

## 🎨 Theme & Language

- **Theme Toggle**: Click the sun/moon icon in the header to toggle between light and dark themes
- **Language Toggle**: Click the language button (EN/اردو) in the header to switch between English and Urdu

## 📦 Default Credentials (After Seeding)

- **Email**: admin@portfolio.com
- **Password**: admin123

**⚠️ IMPORTANT**: Change the default admin password in production!

## 🚢 Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible
3. Update CORS settings if needed
4. Build and deploy

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting platform

3. Update API URLs in production environment file

## 📄 Default Resume

A default resume PDF file should be placed in `backend/uploads/resume.pdf`. 

**To add a default resume:**
1. Create a PDF file with your resume
2. Place it in `backend/uploads/resume.pdf`
3. The resume will be downloadable via the "View Resume" button

**To upload a new resume (after logging in):**
- Use the admin interface or API endpoint `POST /api/upload/resume` with authentication

**Note:** The uploads directory will be created automatically when the server starts, but you need to add your resume PDF manually.

## 🔒 Security Notes

- Always use strong JWT secrets in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting (already configured)
- Validate and sanitize all user inputs
- Keep dependencies updated

## 📝 License

This project is created for MoazAli's portfolio.

## 👤 Contact Information

- **Name**: MoazAli
- **Email**: moazj049@gmail.com
- **Phone**: 03278031032
- **LinkedIn**: https://www.linkedin.com/in/moaz-ali-4710ba397/
- **GitHub**: https://github.com/Moazali302
- **Education**: Riphah International University (2022–2026)

## 🤝 Contributing

This is a personal portfolio project. For suggestions or issues, please contact MoazAli directly.

---

Built with ❤️ by MoazAli

