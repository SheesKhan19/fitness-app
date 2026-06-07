import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: 13,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Please select your gender'],
    },
    weight: {
      type: Number,
      required: [true, 'Please provide your weight in kg'],
      min: 20,
      max: 500,
    },
    height: {
      type: Number,
      required: [true, 'Please provide your height in cm'],
      min: 100,
      max: 250,
    },
    fitnessGoal: {
      type: String,
      enum: [
        'Weight Loss',
        'Muscle Gain',
        'Endurance',
        'Flexibility',
        'General Fitness',
        'Athletic Performance',
      ],
      required: [true, 'Please select your fitness goal'],
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/150?img=1',
    },
    isTrainer: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    workouts: {
      type: Number,
      default: 0,
    },
    fitnessPoints: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastWorkoutDate: {
      type: Date,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'],
      default: 'Bronze',
    },
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Remove password from response
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

export default mongoose.model('User', userSchema)
