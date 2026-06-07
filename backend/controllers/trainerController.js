import Trainer from '../models/Trainer.js'

export const getAllTrainers = async (req, res) => {
  try {
    const { specialty } = req.query

    let query = {}
    if (specialty) {
      query.specialty = specialty
    }

    const trainers = await Trainer.find(query)

    res.status(200).json({
      success: true,
      data: trainers,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found',
      })
    }

    res.status(200).json({
      success: true,
      data: trainer,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const bookConsultation = async (req, res) => {
  try {
    const { trainerId } = req.body

    const trainer = await Trainer.findById(trainerId)

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found',
      })
    }

    // For MVP, just return success
    res.status(200).json({
      success: true,
      message: 'Consultation booking request sent!',
      data: {
        trainer: trainer.name,
        user: req.user.name,
        bookedAt: new Date(),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
