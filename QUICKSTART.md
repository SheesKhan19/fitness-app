# FitSphere - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Clone/Download the Project
```bash
cd fitness-app
```

### 2. Install All Dependencies
```bash
npm install-all
```

This will install dependencies for both frontend and backend.

### 3. Setup Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/fitsphere
JWT_SECRET=your_super_secret_key_make_it_long
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
```

The default value should work: `VITE_API_URL=http://localhost:5000/api`

### 4. Start the Application

From the root directory:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 🔧 MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended for MVP)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (free tier)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/fitsphere`
5. Add your IP to network access
6. Update `MONGODB_URI` in `.env`

### Option 2: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   brew services start mongodb-community
   ```
3. Update `MONGODB_URI`:
   ```
   MONGODB_URI=mongodb://localhost:27017/fitsphere
   ```

---

## 📱 Testing the Application

### 1. Signup
- Go to http://localhost:5173/signup
- Fill in all required fields:
  - Name, Email, Password
  - Age (13-120)
  - Gender (Male/Female/Other)
  - Weight (kg)
  - Height (cm)
  - Fitness Goal
- Click "Create Account"

### 2. Dashboard
- After signup, you'll be redirected to dashboard
- View your stats and profile information
- Click "Logout" to go back to login page

### 3. Login
- Go to http://localhost:5173/login
- Use the email and password from signup
- Access your dashboard again

---

## 🐛 Troubleshooting

### Frontend not connecting to backend
- Check that backend is running on port 5000
- Check CORS is enabled in backend
- Verify `VITE_API_URL` in frontend `.env`

### MongoDB connection error
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP is whitelisted in MongoDB Atlas

### Port already in use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### Clear node_modules and reinstall
```bash
npm run install-all
```

---

## 📦 Project Structure Quick Reference

```
frontend/
├── src/pages/          # Login, Signup, Dashboard pages
├── src/components/     # Reusable components (Navbar, etc)
├── src/services/       # API calls (api.js)
├── src/store/          # State management (authStore.js)
└── tailwind.config.js  # Styling configuration

backend/
├── routes/auth.js      # Authentication endpoints
├── controllers/        # Business logic
├── models/User.js      # MongoDB user schema
├── middleware/auth.js  # JWT verification
└── server.js           # Express server setup
```

---

## 🎯 Next Steps

1. **Test the auth flow** - Signup → Login → Dashboard
2. **Customize colors** - Edit `frontend/tailwind.config.js`
3. **Add more pages** - Community, Trainers, Challenges
4. **Integrate AI coaching** - Add AI endpoints to backend
5. **Deploy** - Use Vercel (frontend), Railway/Render (backend)

---

## 📝 API Testing

Use curl or Postman to test endpoints:

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "age": 25,
    "gender": "Male",
    "weight": 70,
    "height": 175,
    "fitnessGoal": "Muscle Gain"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🎉 You're All Set!

Start building on top of FitSphere. Good luck with your hackathon! 🚀
