import mongoose from 'mongoose'

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Trainer name is required'],
    },
    bio: String,
    image: {
      type: String,
      default: 'https://i.pravatar.cc/150?img=1',
    },
    specialty: [
      {
        type: String,
        enum: [
          'Fat Loss',
          'Bodybuilding',
          'Powerlifting',
          "Women's Fitness",
          'Sports Performance',
          'Nutrition',
        ],
      },
    ],
    experience: {
      type: Number,
      required: true,
    },
    certifications: [String],
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Trainer', trainerSchema)
