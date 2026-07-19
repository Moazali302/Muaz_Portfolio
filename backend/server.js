const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:4202']; // Angular dev server

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// ===== Static Upload Folder =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== API Routes =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/github', require('./routes/github'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/newsletter', require('./routes/newsletter'));

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// ===== Health Check =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

// // ===== Serve Angular Frontend =====
// const frontendPath = path.join(__dirname, '../frontend/portfolio-app/dist/portfolio-app/browser');
// app.use(express.static(frontendPath));

// // Catch-all to serve Angular index.html for SPA routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });
  app.get('/', (req, res) => {
  res.json({
    message: "Portfolio Backend API Running"
  });
});
// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
