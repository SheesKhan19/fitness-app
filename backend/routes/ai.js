import express from 'express'
import { generatePlan } from '../controllers/aiController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate-plan', protect, generatePlan)

export default router
