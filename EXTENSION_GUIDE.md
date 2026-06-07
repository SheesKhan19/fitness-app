# FitSphere Extension Guide

## 🎯 How to Extend FitSphere

This guide shows you how to add new features to FitSphere following the existing patterns.

---

## 📖 Table of Contents

1. [Adding New Pages](#adding-new-pages)
2. [Creating New Components](#creating-new-components)
3. [Adding API Endpoints](#adding-api-endpoints)
4. [Adding Database Models](#adding-database-models)
5. [Styling New Features](#styling-new-features)
6. [Best Practices](#best-practices)

---

## Adding New Pages

### Step 1: Create the Page Component

Create a new file: `frontend/src/pages/YourPage.jsx`

```jsx
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'
import useAuthStore from '@/store/authStore'

export default function YourPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Your Page <span className="gradient-text">Title</span>
        </h1>

        <div className="card">
          <p className="text-gray-400">Your content here</p>
        </div>
      </div>
    </div>
  )
}
```

### Step 2: Add Route to App.jsx

Edit `frontend/src/App.jsx`:

```jsx
import YourPage from '@/pages/YourPage'

// Inside Routes component
<Route
  path="/your-page"
  element={
    <ProtectedRoute>
      <YourPage />
    </ProtectedRoute>
  }
/>
```

### Step 3: Add Navigation Link

Edit `frontend/src/components/Navbar.jsx` to add link:

```jsx
<nav className="flex gap-4">
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/your-page">Your Page</Link>
</nav>
```

---

## Creating New Components

### Step 1: Create Component File

Create: `frontend/src/components/YourComponent.jsx`

```jsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function YourComponent({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full"
      >
        <h3 className="text-lg font-bold">{title}</h3>
        <ChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}
```

### Step 2: Use Component in Page

```jsx
import YourComponent from '@/components/YourComponent'

export default function Dashboard() {
  return (
    <YourComponent title="Expandable Section">
      <p>Your content here</p>
    </YourComponent>
  )
}
```

---

## Adding API Endpoints

### Step 1: Create Controller

Create: `backend/controllers/yourController.js`

```javascript
import User from '../models/User.js'

export const doSomething = async (req, res) => {
  try {
    // Your logic here
    const result = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const doSomethingWithParam = async (req, res) => {
  try {
    const { id } = req.params
    const { data } = req.body

    // Your logic here

    res.status(200).json({
      success: true,
      message: 'Success',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
```

### Step 2: Create Route

Create or edit: `backend/routes/your.js`

```javascript
import express from 'express'
import { doSomething, doSomethingWithParam } from '../controllers/yourController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/something', protect, doSomething)
router.post('/something/:id', protect, doSomethingWithParam)

export default router
```

### Step 3: Register Route in Server

Edit `backend/server.js`:

```javascript
import yourRoutes from './routes/your.js'

app.use('/api/your', yourRoutes)
```

### Step 4: Create API Service

Edit or add to `frontend/src/services/api.js`:

```javascript
export const yourAPI = {
  getSomething: () =>
    apiClient.get('/your/something'),

  postSomething: (id, data) =>
    apiClient.post(`/your/something/${id}`, data),
}
```

### Step 5: Use in Component

```jsx
import { yourAPI } from '@/services/api'
import { useState, useEffect } from 'react'

export default function MyComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await yourAPI.getSomething()
      setData(response.data.data)
    }
    fetchData()
  }, [])

  return <div>{data && <p>{data.name}</p>}</div>
}
```

---

## Adding Database Models

### Step 1: Create Model

Create: `backend/models/YourModel.js`

```javascript
import mongoose from 'mongoose'

const yourSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: String,
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    metadata: {
      createdBy: String,
      tags: [String],
    },
  },
  { timestamps: true }
)

// Add indexes for frequently queried fields
yourSchema.index({ userId: 1, status: 1 })

export default mongoose.model('YourModel', yourSchema)
```

### Step 2: Update Related Models

If your model references User, update `backend/models/User.js`:

```javascript
// Add to User schema
yourModels: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'YourModel',
  },
]
```

### Step 3: Create CRUD Endpoints

```javascript
// In controller
import YourModel from '../models/YourModel.js'

export const create = async (req, res) => {
  try {
    const item = await YourModel.create({
      ...req.body,
      userId: req.user._id,
    })
    res.status(201).json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const items = await YourModel.find({ userId: req.user._id })
    res.status(200).json({ success: true, data: items })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getOne = async (req, res) => {
  try {
    const item = await YourModel.findById(req.params.id)
    res.status(200).json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const item = await YourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const delete_ = async (req, res) => {
  try {
    await YourModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
```

---

## Styling New Features

### Use Custom Classes

```jsx
// ✅ Good
<button className="btn-primary">Submit</button>
<input className="input-field" />
<div className="card">Content</div>

// ❌ Avoid
<button className="bg-blue-500 px-4 py-2 rounded">Submit</button>
```

### Responsive Design

```jsx
// Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Color Consistency

```jsx
// Use theme colors
<h1 className="gradient-text">Title</h1>
<p className="text-gray-400">Description</p>
<div className="border border-gray-700">Card</div>
```

### Animations

```jsx
// Add hover effects
<div className="card hover:border-primary transition-all">
  <h3 className="hover:text-primary transition-colors">Title</h3>
</div>
```

---

## Best Practices

### 1. Error Handling

Always handle errors gracefully:

```jsx
const [error, setError] = useState('')

try {
  const { data } = await api.call()
  setData(data)
} catch (err) {
  setError(err.response?.data?.message || 'An error occurred')
}
```

### 2. Loading States

Show user feedback:

```jsx
const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  setLoading(true)
  try {
    await api.call()
  } finally {
    setLoading(false)
  }
}
```

### 3. Input Validation

Validate on both client and server:

```javascript
// Client
if (!email || !email.includes('@')) {
  setError('Invalid email')
  return
}

// Server
if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  return res.status(400).json({ message: 'Invalid email' })
}
```

### 4. Code Organization

Keep files small and focused:

```
components/
├── User/
│   ├── UserCard.jsx
│   ├── UserForm.jsx
│   └── UserAvatar.jsx
├── Common/
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Modal.jsx
```

### 5. Reusable Hooks

Create custom hooks for logic:

```javascript
// frontend/src/hooks/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
```

### 6. Environment Variables

Use env vars for sensitive data:

```javascript
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = process.env.SECRET_KEY
```

### 7. Database Indexing

Add indexes for performance:

```javascript
// In model
schema.index({ userId: 1, createdAt: -1 })
```

### 8. Consistent Response Format

Keep API responses consistent:

```javascript
// Success
{ success: true, data: {...}, message: "Done" }

// Error
{ success: false, message: "Error occurred", error: {...} }
```

---

## Example: Adding Workout Feature

### Full Example

**1. Backend Model** (`backend/models/Workout.js`)
```javascript
const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercise: String,
  duration: Number,
  calories: Number,
  date: { type: Date, default: Date.now }
}, { timestamps: true })
```

**2. Controller** (`backend/controllers/workoutController.js`)
```javascript
export const logWorkout = async (req, res) => {
  const workout = await Workout.create({ ...req.body, userId: req.user._id })
  res.json({ success: true, data: workout })
}
```

**3. Route** (`backend/routes/workouts.js`)
```javascript
router.post('/', protect, logWorkout)
```

**4. API Service** (`frontend/src/services/api.js`)
```javascript
export const workoutAPI = {
  log: (data) => apiClient.post('/workouts', data),
}
```

**5. Component** (`frontend/src/components/WorkoutForm.jsx`)
```jsx
const handleSubmit = async (formData) => {
  await workoutAPI.log(formData)
}
```

---

## Debugging Tips

### Frontend
```javascript
// Use console
console.log('Data:', data)
console.table(array)

// Use React DevTools
// Browser extension for React component inspection

// Use Axios interceptors
apiClient.interceptors.response.use(
  (res) => { console.log('Response:', res); return res },
  (err) => { console.error('Error:', err); return Promise.reject(err) }
)
```

### Backend
```javascript
// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Test with curl
curl -X POST http://localhost:5000/api/your/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

---

## Testing Your Changes

### 1. Local Testing
```bash
npm run dev
# Test in browser/Postman
```

### 2. Unit Testing
```bash
# Install Jest
npm install --save-dev jest

# Create test file
# your-feature.test.js
```

### 3. Manual Testing Checklist
- [ ] Feature works on desktop
- [ ] Feature works on tablet
- [ ] Feature works on mobile
- [ ] Error handling works
- [ ] Loading states show
- [ ] No console errors

---

## Deployment Considerations

- Update environment variables
- Test in staging
- Database migrations if needed
- Clear browser cache
- Test on production URL

---

**Happy extending! Build awesome features on FitSphere! 🚀**
