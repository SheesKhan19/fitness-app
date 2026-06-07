# FitSphere - Pakistan's AI-Powered Fitness Ecosystem 🏋️

A modern, full-stack MVP for a fitness community platform combining social networking, trainer marketplace, gamification, and AI coaching.

## 🌟 Features

### 🔐 Authentication
- User signup with comprehensive fitness profiling
- Secure login with JWT authentication
- User fields: Name, Email, Password, Age, Gender, Weight, Height, Fitness Goal
- Password hashing with bcryptjs

### 🎨 Modern UI
- Dark mode by default
- Responsive design (mobile, tablet, desktop)
- Modern interface inspired by Reddit, Discord, and Strava
- Real-time animations and transitions
- Fitness-themed color scheme

### 📊 User Dashboard
- Quick stats (workouts, streaks, followers, fitness points)
- Quick action buttons (Start Workout, Find Trainers, View Challenges)
- User profile information display
- Navbar with logout functionality

### 🏗️ Backend Infrastructure
- RESTful API with Express.js
- MongoDB integration with Mongoose
- JWT-based authentication
- Protected routes with middleware
- Comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS 3** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
fitness-app/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   └── Navbar.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API calls
│   │   │   └── api.js
│   │   ├── store/             # State management
│   │   │   └── authStore.js
│   │   ├── index.css          # Global styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── backend/
│   ├── config/                # Configuration
│   │   └── db.js
│   ├── controllers/           # Business logic
│   │   └── authController.js
│   ├── middleware/            # Express middleware
│   │   └── auth.js
│   ├── models/                # MongoDB schemas
│   │   └── User.js
│   ├── routes/                # API routes
│   │   └── auth.js
│   ├── utils/                 # Utilities
│   │   └── jwt.js
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your MongoDB URI**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitsphere
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Create new user account | ❌ |
| POST | `/login` | Login with email & password | ❌ |
| GET | `/profile` | Get current user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |

### Request/Response Examples

**Signup Request**
```json
{
  "name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "password": "securePassword123",
  "age": 28,
  "gender": "Male",
  "weight": 75,
  "height": 180,
  "fitnessGoal": "Muscle Gain"
}
```

**Login Request**
```json
{
  "email": "ahmed@example.com",
  "password": "securePassword123"
}
```

**Response**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123456",
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "age": 28,
    "gender": "Male",
    "weight": 75,
    "height": 180,
    "fitnessGoal": "Muscle Gain",
    "workouts": 0,
    "fitnessPoints": 0,
    "streak": 0
  }
}
```

## 🎯 User Fields

All users are required to provide:
- **Name** - Full name (max 50 characters)
- **Email** - Valid email address (unique)
- **Password** - Minimum 6 characters (hashed with bcryptjs)
- **Age** - Between 13 and 120
- **Gender** - Male, Female, or Other
- **Weight** - In kilograms (kg)
- **Height** - In centimeters (cm)
- **Fitness Goal** - One of:
  - Weight Loss
  - Muscle Gain
  - Endurance
  - Flexibility
  - General Fitness
  - Athletic Performance

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT-based authentication
- ✅ Protected API routes with middleware
- ✅ CORS enabled for frontend integration
- ✅ Input validation on all endpoints
- ✅ Email uniqueness validation
- ✅ Environment variables for sensitive data

## 🎨 UI/UX Features

### Color Scheme
- **Primary**: #FF6B35 (Vibrant Orange)
- **Secondary**: #004E89 (Deep Blue)
- **Accent**: #F77F00 (Golden Orange)
- **Dark**: #1a1a1a
- **Darker**: #0f0f0f

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Interactive Elements
- Hover effects on cards and buttons
- Smooth transitions
- Gradient text effects
- Custom scrollbars
- Loading states on form submissions

## 🚀 Future Enhancements

1. **AI Coaching**
   - Personalized workout recommendations
   - Form correction using computer vision
   - Real-time coaching feedback

2. **Trainer Marketplace**
   - Trainer verification system
   - Booking and scheduling
   - Payment integration
   - Reviews and ratings

3. **Community Features**
   - Post/feed system (like Reddit/Strava)
   - Comments and likes
   - Follow/unfollow users
   - Direct messaging

4. **Gamification**
   - Workout challenges
   - Achievement badges
   - Leaderboards
   - Streak tracking
   - Points and rewards system

5. **Additional Features**
   - Workout logging
   - Progress tracking with charts
   - Nutrition tracking
   - Integration with fitness wearables
   - Mobile app (React Native)

## 📱 Screenshots

(Coming Soon)

## 🤝 Contributing

This is a hackathon MVP. Feel free to fork, modify, and build upon it!

## 📄 License

MIT License - feel free to use this project for commercial or personal purposes.

## 👥 Team

FitSphere Team - Pakistan's AI-Powered Fitness Ecosystem

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

**Built with ❤️ for the fitness community of Pakistan**
