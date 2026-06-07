import express from 'express'
import { getAllTrainers, getTrainer, bookConsultation } from '../controllers/trainerController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllTrainers)
router.get('/:id', getTrainer)
router.post('/book', protect, bookConsultation)

export default router
