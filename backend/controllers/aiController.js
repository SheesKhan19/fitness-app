// AI Coach Controller - Placeholder for later OpenAI integration
const generateWorkoutPlan = (userProfile) => {
  const { age, weight, height, goal, experienceLevel, equipment } = userProfile

  // Calculate BMI for recommendations
  const bmi = weight / ((height / 100) ** 2)

  // Generate calorie estimate
  const baseCalories = 2000
  const adjustedCalories =
    goal === 'Weight Loss' ? baseCalories - 500 : goal === 'Muscle Gain' ? baseCalories + 500 : baseCalories

  // Generate macros based on goal
  let macros = {
    proteins: 0,
    carbs: 0,
    fats: 0,
  }

  if (goal === 'Muscle Gain') {
    macros = {
      proteins: Math.round((adjustedCalories * 0.3) / 4),
      carbs: Math.round((adjustedCalories * 0.5) / 4),
      fats: Math.round((adjustedCalories * 0.2) / 9),
    }
  } else if (goal === 'Weight Loss') {
    macros = {
      proteins: Math.round((adjustedCalories * 0.35) / 4),
      carbs: Math.round((adjustedCalories * 0.4) / 4),
      fats: Math.round((adjustedCalories * 0.25) / 9),
    }
  } else {
    macros = {
      proteins: Math.round((adjustedCalories * 0.3) / 4),
      carbs: Math.round((adjustedCalories * 0.45) / 4),
      fats: Math.round((adjustedCalories * 0.25) / 9),
    }
  }

  // Generate weekly workout plan
  const workouts = generateWorkouts(experienceLevel, equipment, goal)

  const recommendations = [
    `Based on your BMI of ${bmi.toFixed(1)}, you should aim for ${goal.toLowerCase()}`,
    `Consume approximately ${adjustedCalories} calories daily`,
    `Stay hydrated - drink at least 8-10 glasses of water daily`,
    `Get 7-8 hours of sleep for optimal recovery`,
    `Warm up for 5-10 minutes before each workout`,
    `Cool down and stretch for 5 minutes after training`,
  ]

  return {
    weeklyPlan: workouts,
    calories: adjustedCalories,
    macros,
    recommendations,
    bmi: bmi.toFixed(1),
  }
}

const generateWorkouts = (level, equipment, goal) => {
  const workouts = {
    Beginner: [
      { day: 'Monday', exercise: 'Cardio', duration: 30, sets: 3, reps: 'Continuous' },
      { day: 'Tuesday', exercise: 'Full Body Strength', duration: 45, sets: 3, reps: '8-12' },
      { day: 'Wednesday', exercise: 'Rest Day', duration: 0, sets: 0, reps: '' },
      { day: 'Thursday', exercise: 'Yoga/Flexibility', duration: 30, sets: 1, reps: 'Continuous' },
      { day: 'Friday', exercise: 'Full Body Strength', duration: 45, sets: 3, reps: '8-12' },
      { day: 'Saturday', exercise: 'Light Cardio', duration: 20, sets: 1, reps: 'Continuous' },
      { day: 'Sunday', exercise: 'Rest Day', duration: 0, sets: 0, reps: '' },
    ],
    Intermediate: [
      { day: 'Monday', exercise: 'Chest & Triceps', duration: 60, sets: 4, reps: '8-10' },
      { day: 'Tuesday', exercise: 'Back & Biceps', duration: 60, sets: 4, reps: '8-10' },
      { day: 'Wednesday', exercise: 'Cardio & Core', duration: 40, sets: 3, reps: '12-15' },
      { day: 'Thursday', exercise: 'Rest Day', duration: 0, sets: 0, reps: '' },
      { day: 'Friday', exercise: 'Legs', duration: 60, sets: 4, reps: '8-12' },
      { day: 'Saturday', exercise: 'Upper Body', duration: 50, sets: 3, reps: '10-12' },
      { day: 'Sunday', exercise: 'Rest Day', duration: 0, sets: 0, reps: '' },
    ],
    Advanced: [
      { day: 'Monday', exercise: 'Push Day (Chest/Shoulder/Triceps)', duration: 75, sets: 5, reps: '6-8' },
      { day: 'Tuesday', exercise: 'Pull Day (Back/Biceps)', duration: 75, sets: 5, reps: '6-8' },
      { day: 'Wednesday', exercise: 'High Intensity Cardio', duration: 30, sets: 1, reps: 'HIIT' },
      { day: 'Thursday', exercise: 'Leg Day', duration: 80, sets: 5, reps: '6-8' },
      { day: 'Friday', exercise: 'Accessory & Conditioning', duration: 60, sets: 4, reps: '10-15' },
      { day: 'Saturday', exercise: 'Active Recovery', duration: 30, sets: 1, reps: 'Light' },
      { day: 'Sunday', exercise: 'Rest Day', duration: 0, sets: 0, reps: '' },
    ],
  }

  return workouts[level] || workouts.Beginner
}

export const generatePlan = async (req, res) => {
  try {
    const { age, weight, height, goal, experienceLevel, equipment } = req.body

    // Validate inputs
    if (!age || !weight || !height || !goal || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // Generate plan using placeholder
    const plan = generateWorkoutPlan({
      age,
      weight,
      height,
      goal,
      experienceLevel,
      equipment: equipment || [],
    })

    res.status(200).json({
      success: true,
      data: plan,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
