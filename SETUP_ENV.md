# Environment Setup

## Backend .env File

Create a file named `.env` in the `backend` directory with the following content:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=portfolio-secret-key-change-in-production-2024
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
COUNTRY_API_KEY=
```

**Note:** The .env file is in .gitignore for security. You need to create it manually.

## Quick Setup

1. **Create backend/.env file** (copy the content above)

2. **Run backend:**
   ```bash
   cd backend
   npm install
   npm run seed  # Creates admin user and sample data
   npm run dev   # Starts on http://localhost:3000
   ```

3. **Run frontend:**
   ```bash
   cd frontend/portfolio-app
   npm install
   npm start     # Starts on http://localhost:4202
   ```

## Default Admin Credentials

After running `npm run seed`:
- Email: `admin@portfolio.com`
- Password: `admin123`

**⚠️ Change this password in production!**

