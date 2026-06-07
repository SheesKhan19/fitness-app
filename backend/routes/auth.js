import express from 'express'
import { signup, login, getProfile, updateProfile, getLeaderboard } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/leaderboard', getLeaderboard)

export default router
