# 🛠️ FitSphere - Installation & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Setup](#quick-setup)
3. [Detailed Setup](#detailed-setup)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Seed Data](#seed-data)
7. [Troubleshooting](#troubleshooting)
8. [Production Deployment](#production-deployment)

---

## Prerequisites

Before getting started, ensure you have the following installed:

### Required
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** v8 or higher (comes with Node.js)
- **MongoDB** (either local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (optional, for version control)

### Recommended
- **VS Code** ([Download](https://code.visualstudio.com/))
- **MongoDB Compass** (for database visualization)
- **Postman** (for API testing)

---

## Quick Setup

### Windows
```bash
# Navigate to project
cd d:\01Projects\Fitness-app

# Run setup script
setup.bat

# Configure database
# Edit backend\.env with your MongoDB URI

# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm run dev

# Open http://localhost:5173 in browser
```

### Mac/Linux
```bash
# Navigate to project
cd /path/to/Fitness-app

# Run setup script
chmod +x setup.sh
./setup.sh

# Configure database
# Edit backend/.env with your MongoDB URI

# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm run dev

# Open http://localhost:5173 in browser
```

---

## Detailed Setup

### Step 1: Clone/Extract Project
```bash
# If cloned from git
git clone <repository-url>
cd Fitness-app

# If extracted from ZIP, navigate to folder
cd d:\01Projects\Fitness-app
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

Expected packages:
- Express.js (server)
- MongoDB & Mongoose (database)
- JWT & bcryptjs (auth)
- CORS (cross-origin)
- dotenv (environment)

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

Expected packages:
- React 18 (UI)
- React Router (navigation)
- Axios (HTTP client)
- Zustand (state management)
- Tailwind CSS (styling)
- Lucide Icons (icons)
- date-fns (date formatting)

### Step 4: Create Environment Files

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

**Content:**
```
MONGODB_URI=mongodb://localhost:27017/fitsphere
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
# No changes needed, defaults work locally
```

---

## Database Setup

### Option A: Local MongoDB

#### Install MongoDB
- **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install mongodb`

#### Start MongoDB
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
# or
mongod
```

#### Connection String
```
MONGODB_URI=mongodb://localhost:27017/fitsphere
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Create database user
5. Add your IP to whitelist
6. Copy connection string
7. Replace `<password>` with your password

#### Connection String
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitsphere?retryWrites=true&w=majority
```

---

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected to fitsphere
API health check: http://localhost:5000/api/health
```

### Terminal 2: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms

➜ Local: http://localhost:5173/
```

### Access Application
Open your browser: **http://localhost:5173**

You'll be redirected to login page.

---

## Seed Data

### Generate Sample Data
```bash
cd backend
npm run seed
```

This creates:
- **20 users** with varying levels and XP
- **8 trainers** with specialties and ratings
- **30 community posts** with realistic fitness content

### Sample Login Credentials
```
Email: john.doe@fitness.com
Password: password123

Email: sarah.smith@fitness.com
Password: password123
```

### Clear Database
```bash
# To remove all data and reseed
npm run seed
```

---

## Troubleshooting

### MongoDB Connection Failed
**Error:** `MongooseError: Could not connect to MongoDB`

**Solution:**
- Verify MongoDB is running: `mongod` in separate terminal
- Check connection string in `.env`
- For Atlas: Verify IP whitelist includes your IP
- Check username/password for Atlas

### Port Already in Use
**Error:** `Error: listen EADDRINUSE :::5000`

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### CORS Errors in Console
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Verify backend is running on localhost:5000
- Check `VITE_API_URL` in frontend/.env
- Ensure CORS is enabled in backend/server.js

### Module Not Found
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
cd backend
npm install

cd frontend
npm install
```

### API Calls Return 401
**Error:** `Unauthorized`

**Solution:**
- Ensure JWT token is in localStorage
- Check token hasn't expired
- Verify JWT_SECRET matches in backend
- Try logging out and logging back in

### Build Errors
**Error:** Vite/build fails

**Solution:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Blank Page or Styling Issues
**Error:** Page loads but styles are missing

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh page (Ctrl+Shift+R)
- Check browser console for errors (F12)
- Verify Tailwind CSS is installed: `npm list tailwindcss`

### Post not appearing in feed
**Error:** Create post succeeds but doesn't show

**Solution:**
- Check browser console for errors
- Verify backend seeded data properly
- Try refreshing page
- Check MongoDB has data: use MongoDB Compass

---

## Production Deployment

### Frontend Deployment (Vercel)

1. **Build Project**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel**
- Go to [Vercel](https://vercel.com)
- Connect GitHub repository
- Select frontend folder as root
- Set `VITE_API_URL` environment variable
- Deploy

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare Project**
```bash
cd backend
npm install --production
```

2. **Deploy to Heroku**
```bash
# Install Heroku CLI first
heroku login
heroku create your-app-name
git push heroku main
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
```

### Environment Variables for Production

**Backend**
```
MONGODB_URI=your_atlas_connection_string
JWT_SECRET=strong_secret_key
JWT_EXPIRE=7d
PORT=process.env.PORT
NODE_ENV=production
```

**Frontend**
```
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] MongoDB connected successfully
- [ ] Can access http://localhost:5173 in browser
- [ ] Can see login page
- [ ] Can create new account
- [ ] Can login with credentials
- [ ] Can see dashboard
- [ ] Sidebar navigation works
- [ ] Can access all pages
- [ ] Sample data loads (after seed)

---

## 📚 Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm run seed         # Seed database
npm run build        # Build for production

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
mongod               # Start MongoDB
mongo                # Connect to MongoDB shell
```

---

## 📞 Support & Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ✅ You're Ready!

Your FitSphere MVP is now fully set up and ready to use. Start exploring all the features and customize as needed!

**Happy Coding! 💪**
