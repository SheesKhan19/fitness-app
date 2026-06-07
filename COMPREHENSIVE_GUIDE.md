# FitSphere - Comprehensive Fitness Platform

## 🚀 Project Overview

FitSphere is a modern, gamified fitness platform that combines AI-powered coaching, community engagement, trainer marketplace, and research analysis tools. Users can track their fitness journey, compete on leaderboards, and connect with certified fitness professionals.

---

## ✨ Key Features

### 1. **Authentication System**
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Profile management

### 2. **Dashboard**
- Personalized welcome
- XP and level tracking
- Current streak display
- Daily login rewards
- Quick access to all features
- User fitness profile overview

### 3. **Gamification System**
- **XP Rewards:**
  - Create post: 20 XP
  - Add comment: 10 XP
  - Daily login: 15 XP
  - Upload progress photo: 50 XP
  
- **Level System:**
  - Bronze: 0-999 XP
  - Silver: 1000-2499 XP
  - Gold: 2500-3999 XP
  - Platinum: 4000-5999 XP
  - Elite: 6000+ XP

### 4. **Community Feed**
- Create fitness posts with images
- Like/unlike posts
- Comment on posts
- See engagement metrics
- Real-time feed updates
- Social connectivity

### 5. **Find Coaches**
- Browse certified trainers
- Filter by specialty:
  - Fat Loss
  - Bodybuilding
  - Powerlifting
  - Women's Fitness
  - Sports Performance
  - Nutrition
- View trainer profiles:
  - Name, bio, image
  - Experience and certifications
  - Rating and reviews
  - Hourly rate
- Book consultations (MVP: success modal)

### 6. **AI Fitness Coach**
- Generate personalized workout plans
- Input parameters:
  - Age, weight, height
  - Fitness goal
  - Experience level
  - Available equipment
- Receives:
  - Weekly schedule with exercises
  - Daily calorie recommendations
  - Macro distribution (proteins, carbs, fats)
  - Personalized recommendations
  - BMI calculation

### 7. **Research Simplifier**
- Paste fitness articles or research abstracts
- Mock AI analysis returns:
  - Summary of content
  - Key findings
  - Practical takeaways
  - Reliability score (1-10)
- Help users understand complex fitness research

### 8. **Leaderboard**
- Global ranking by XP
- Top 3 highlighted with medals
- Display user level, XP, and streak
- Motivates community engagement

### 9. **User Profile**
- View fitness stats
- Edit profile information
- Track fitness goal
- Display level and achievements
- BMI calculation
- Update personal information

### 10. **Navigation**
- Responsive sidebar navigation
- Quick access to all features
- User profile in sidebar
- Mobile-friendly toggle

---

## 🏗️ Architecture

### Backend Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js              # JWT authentication
├── models/
│   ├── User.js              # User schema with XP/level
│   ├── Post.js              # Community posts
│   ├── Comment.js           # Post comments
│   └── Trainer.js           # Trainer profiles
├── controllers/
│   ├── authController.js    # Auth & profile logic
│   ├── postController.js    # Community feed logic
│   ├── trainerController.js # Trainer marketplace
│   └── aiController.js      # AI coach logic
├── routes/
│   ├── auth.js              # Auth endpoints
│   ├── posts.js             # Post endpoints
│   ├── trainers.js          # Trainer endpoints
│   └── ai.js                # AI coach endpoints
├── scripts/
│   └── seedDatabase.js      # Sample data generation
├── package.json
└── server.js                # Express server setup
```

### Frontend Structure
```
frontend/src/
├── components/
│   └── Sidebar.jsx          # Navigation sidebar
├── pages/
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Registration page
│   ├── Dashboard.jsx        # Main dashboard
│   ├── Community.jsx        # Community feed
│   ├── Coaches.jsx          # Trainer marketplace
│   ├── AICoach.jsx          # AI coach form
│   ├── ResearchSimplifier.jsx # Research analyzer
│   ├── Leaderboard.jsx      # Global rankings
│   └── Profile.jsx          # User profile
├── services/
│   └── api.js               # API client & endpoints
├── store/
│   └── authStore.js         # Auth state management
├── App.jsx                  # Main routing
└── main.jsx                 # Entry point
```

---

## 📊 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  age: Number,
  gender: String,
  weight: Number,
  height: Number,
  bio: String,
  avatar: String,
  fitnessGoal: String,
  xp: Number (default: 0),
  level: String (enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Elite']),
  streak: Number (default: 0),
  lastWorkoutDate: Date,
  followers: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  author: ObjectId (ref: User),
  title: String (required),
  description: String (required),
  image: String,
  likes: [ObjectId],
  likesCount: Number (default: 0),
  comments: [ObjectId],
  commentsCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Trainer Schema
```javascript
{
  name: String (required),
  bio: String,
  image: String,
  specialty: [String],
  experience: Number (required),
  certifications: [String],
  rating: Number (1-5, default: 4.5),
  reviews: Number (default: 0),
  hourlyRate: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Schema
```javascript
{
  post: ObjectId (ref: Post, required),
  author: ObjectId (ref: User, required),
  content: String (required),
  likes: [ObjectId],
  likesCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `GET /api/auth/leaderboard` - Get global leaderboard

### Community Posts
- `POST /api/posts` - Create post (protected)
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)
- `DELETE /api/posts/:id` - Delete post (protected, owner only)

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers?specialty=Fat%20Loss` - Filter by specialty
- `GET /api/trainers/:id` - Get trainer details
- `POST /api/trainers/book` - Book consultation (protected)

### AI Coach
- `POST /api/ai/generate-plan` - Generate workout plan (protected)

---

## 🌱 Seed Data

The project includes 30 sample community posts, 20 sample users, and 8 sample trainers for demonstration.

### Run Seed Script
```bash
cd backend
npm run seed
```

This generates:
- **20 Users** with various levels (Bronze to Elite) and XP
- **8 Trainers** across all specialties with certifications
- **30 Posts** with realistic fitness content

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **date-fns** - Date formatting

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install

# Create .env file
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Start server
npm run dev

# Seed database (optional)
npm run seed
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file
# VITE_API_URL=http://localhost:5000/api

# Start dev server
npm run dev
```

---

## 📱 Features in Detail

### XP System
Users earn XP through various activities:
- **Post Creation**: 20 XP per post
- **Comments**: 10 XP per comment
- **Daily Login**: 15 XP per day
- **Progress Upload**: 50 XP per photo

### Level Progression
```
Bronze    → 0-999 XP
Silver    → 1000-2499 XP
Gold      → 2500-3999 XP
Platinum  → 4000-5999 XP
Elite     → 6000+ XP
```

### AI Workout Plan Generation
The AI coach generates plans based on:
- User's physical stats (age, weight, height)
- Fitness goal
- Experience level
- Available equipment

Provides:
- 7-day workout schedule
- Calorie recommendations
- Macro distribution
- Recovery tips

### Trainer Matching
Users can browse trainers by:
- Specialty (6 categories)
- Rating and experience
- Certifications
- Hourly rate
- Book consultations

### Research Analysis
Users paste fitness content and receive:
- AI-generated summary
- Key scientific findings
- Practical takeaways
- Reliability score

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes middleware
- CORS configuration
- Environment variables for sensitive data
- Request validation

---

## 📈 Future Enhancements

- [ ] OpenAI integration for real AI coaching
- [ ] Payment gateway for trainer bookings
- [ ] Video workout tutorials
- [ ] Meal plan generator
- [ ] Progress photo storage
- [ ] Social messaging between users
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Advanced analytics dashboard
- [ ] Streaming video consultations

---

## 📝 License

MIT License - Feel free to use this project!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for improvements.

---

## 📞 Support

For questions or support, please create an issue in the repository.

---

**Built with ❤️ for fitness enthusiasts**
