import Trainer from '../models/Trainer.js'
import trainersSeedData from '../data/trainersSeed.js'

export async function ensureTrainersSeeded() {
  const count = await Trainer.countDocuments()
  if (count > 0) {
    return count
  }

  const trainers = await Trainer.insertMany(trainersSeedData)
  console.log(`Seeded ${trainers.length} trainers`)
  return trainers.length
}
