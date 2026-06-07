import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

export const signup = async (req, res) => {
  try {
    const { name, email, password, age, gender, weight, height, fitnessGoal } = req.body
    const parsedAge = Number(age)
    const parsedWeight = Number(weight)
    const parsedHeight = Number(height)

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !weight ||
      !height ||
      !fitnessGoal ||
      Number.isNaN(parsedAge) ||
      Number.isNaN(parsedWeight) ||
      Number.isNaN(parsedHeight)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with that email',
      })
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      age: parsedAge,
      gender,
      weight: parsedWeight,
      height: parsedHeight,
      fitnessGoal,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error during signup',
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error during login',
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching profile',
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, age, weight, height, fitnessGoal } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        bio,
        age,
        weight,
        height,
        fitnessGoal,
      },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile',
    })
  }
}

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('name email xp level streak followers')
      .sort({ xp: -1 })
      .limit(100)

    res.status(200).json({
      success: true,
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching leaderboard',
    })
  }
}
