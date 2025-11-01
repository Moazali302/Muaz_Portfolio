# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
- ✅ Node.js installed (v18+)
- ✅ MongoDB running locally (or connection string ready)

### Step 1: Backend Setup (2 minutes)

```bash
cd backend
npm install
```

Create `backend/.env` file with:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=change-this-to-a-random-string
PORT=3000
```

```bash
npm run seed      # Creates admin user and sample blog post
npm run dev       # Starts server on http://localhost:3000
```

### Step 2: Frontend Setup (2 minutes)

```bash
cd frontend/portfolio-app
npm install
npm start        # Starts on http://localhost:4202
```

### Step 3: Add Resume (1 minute)

1. Create your resume as a PDF
2. Save it as `backend/uploads/resume.pdf`
3. The "View Resume" button will now work!

### ✅ You're Done!

Visit `http://localhost:4202` to see your portfolio!

## 🔑 Default Login

After seeding:
- Email: `admin@portfolio.com`
- Password: `admin123`

## 📝 Next Steps

1. Update personal information in components
2. Customize colors/themes in `src/styles.css`
3. Add your resume PDF
4. Create blog posts via API or admin interface

## 🆘 Troubleshooting

**Backend won't start:**
- Check MongoDB is running
- Verify `.env` file exists in `backend/` directory

**Frontend won't start:**
- Check Node.js version (need v18+)
- Try deleting `node_modules` and running `npm install` again

**Projects not showing:**
- Verify GitHub API is accessible
- Check browser console for errors

---

For detailed documentation, see [README.md](README.md)

