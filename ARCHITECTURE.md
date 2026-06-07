# FitSphere Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           REACT FRONTEND (Port 5173)                      │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                            │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │  Pages: Login, Signup, Dashboard                   │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  │           ↓                                                │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │  Components: Navbar                               │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  │           ↓                                                │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │  Zustand Store: authStore (User State)            │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  │           ↓                                                │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │  Services: axios API calls (api.js)               │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  │           ↓                                                │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │  Tailwind CSS + Custom Styles                      │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓ HTTP/REST                          │
│                  (CORS enabled requests)                        │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   NETWORK / INTERNET                             │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXPRESS SERVER (Port 5000)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Routes: /api/auth                                       │   │
│  │  - POST   /signup                                        │   │
│  │  - POST   /login                                         │   │
│  │  - GET    /profile        (Protected)                    │   │
│  │  - PUT    /profile        (Protected)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware: auth.js (JWT Verification)                │   │
│  │  - Bearer token extraction                              │   │
│  │  - Token verification                                   │   │
│  │  - User attachment to request                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers: authController.js                          │   │
│  │  - signup(req, res)                                      │   │
│  │  - login(req, res)                                       │   │
│  │  - getProfile(req, res)                                  │   │
│  │  - updateProfile(req, res)                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Models: User.js (Mongoose Schema)                       │   │
│  │  - name, email, password (hashed)                        │   │
│  │  - age, gender, weight, height                           │   │
│  │  - fitnessGoal, followers, following                     │   │
│  │  - workouts, fitnessPoints, streak                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Utilities: jwt.js                                       │   │
│  │  - generateToken(userId)                                │   │
│  │  - verifyToken(token)                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                           ↓ MongoDB Protocol
                   (Connection String via Mongoose)
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Database: fitsphere                                             │
│  ├── Collection: users                                           │
│  │   ├── _id                                                     │
│  │   ├── name                                                    │
│  │   ├── email (unique)                                          │
│  │   ├── password (hashed)                                       │
│  │   ├── age, gender, weight, height                             │
│  │   ├── fitnessGoal                                             │
│  │   ├── followers, following (array of user IDs)               │
│  │   ├── workouts, fitnessPoints, streak                         │
│  │   └── timestamps                                              │
│  │                                                               │
│  └── (Future Collections)                                        │
│      ├── workouts                                                │
│      ├── trainers                                                │
│      ├── posts/feed                                              │
│      └── challenges                                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Signup Flow
```
User fills form → React component updates state 
    → handleSubmit triggered 
    → API call via axios (authAPI.signup)
    → Backend receives POST /api/auth/signup
    → Validate fields
    → Hash password with bcryptjs
    → Create user in MongoDB
    → Generate JWT token
    → Return token + user data
    → Frontend receives response
    → Save token to localStorage
    → Update authStore with user
    → Redirect to dashboard
```

### Login Flow
```
User enters credentials → handleSubmit triggered
    → API call via axios (authAPI.login)
    → Backend receives POST /api/auth/login
    → Find user by email
    → Compare password with stored hash
    → Generate JWT token
    → Return token + user data
    → Frontend receives response
    → Save token to localStorage
    → Update authStore with user
    → Redirect to dashboard
```

### Protected Route Access
```
User accesses protected route
    → Check if token exists in authStore
    → If no token → redirect to /login
    → If token exists → render page
    → API requests include Authorization header
    → Backend middleware verifies token
    → If valid → attach user to request → proceed
    → If invalid → return 401 Unauthorized
```

## Component Hierarchy

```
App
├── Router
│   ├── Routes
│   │   ├── Public Routes
│   │   │   ├── Login
│   │   │   │   └── Form Fields (Email, Password)
│   │   │   └── Signup
│   │   │       └── Form Fields (All user fields)
│   │   └── Protected Routes
│   │       └── Dashboard
│   │           ├── Navbar
│   │           │   └── User Info
│   │           │   └── Settings
│   │           │   └── Logout Button
│   │           ├── Welcome Section
│   │           ├── Stats Grid
│   │           │   ├── Workouts Card
│   │           │   ├── Streak Card
│   │           │   ├── Followers Card
│   │           │   └── Points Card
│   │           └── Quick Actions
│   │               ├── Start Workout
│   │               ├── Find Trainers
│   │               └── View Challenges
│   │           └── Profile Info
```

## State Management (Zustand)

### authStore Structure
```javascript
{
  user: {
    _id: string
    name: string
    email: string
    password: string (not stored in client)
    age: number
    gender: string
    weight: number
    height: number
    fitnessGoal: string
    followers: array
    following: array
    workouts: number
    fitnessPoints: number
    streak: number
  },
  token: string (JWT),
  loading: boolean,
  error: string,
  
  // Methods
  setUser: (user) => void
  setToken: (token) => void
  setLoading: (loading) => void
  setError: (error) => void
  logout: () => void
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "65a1234567890",
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "age": 28,
    ...
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Email already exists"
}
```

## Authentication Flow

```
1. Frontend → POST /api/auth/signup {credentials}
                    ↓
2. Backend → Validate input
                    ↓
3. Backend → Check if email exists
                    ↓
4. Backend → Hash password (bcryptjs)
                    ↓
5. Backend → Save user to MongoDB
                    ↓
6. Backend → Generate JWT token
                    ↓
7. Backend → Return token + user
                    ↓
8. Frontend → Save token to localStorage
                    ↓
9. Frontend → Set authStore user + token
                    ↓
10. Frontend → Redirect to /dashboard
                    ↓
11. Protected component → Access token from store
                    ↓
12. API requests → Include "Bearer {token}" header
                    ↓
13. Backend middleware → Verify token
                    ↓
14. Backend → Attach user to req.user
                    ↓
15. Controller → Proceed with request
```

## Scaling Considerations

### Frontend
- Split components into smaller chunks
- Implement code splitting with React.lazy()
- Add infinite scrolling for feeds
- Implement caching strategies
- Add service workers for offline support

### Backend
- Add caching layer (Redis)
- Implement database indexing
- Add pagination to list endpoints
- Implement rate limiting
- Add request validation middleware
- Deploy with load balancing

### Database
- Add indexes on frequently searched fields
- Implement denormalization for performance
- Add archival strategy for old data
- Regular backups and monitoring

---

**This architecture is scalable and production-ready for further development!**
