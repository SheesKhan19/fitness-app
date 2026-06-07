import { useState } from 'react'
import { apiClient } from '@/services/api'
import { Zap, Loader } from 'lucide-react'

export default function AICoach() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: 'Muscle Gain',
    experienceLevel: 'Beginner',
    equipment: [],
  })
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const goals = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Fitness']
  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const equipmentOptions = ['Dumbbells', 'Barbells', 'Cable Machine', 'Treadmill', 'Yoga Mat']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleEquipment = (item) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((e) => e !== item)
        : [...prev.equipment, item],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await apiClient.post('/ai/generate-plan', formData)
      setPlan(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error generating plan:', error)
      setLoading(false)
    }
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            AI Fitness <span className="gradient-text">Coach</span>
          </h1>
          <p className="text-gray-400">Get a personalized workout plan powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Tell Us About You</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="25"
                  required
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="70"
                  required
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="180"
                  required
                />
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fitness Goal
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="input-field"
                >
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="input-field"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Available Equipment
                </label>
                <div className="space-y-2">
                  {equipmentOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.equipment.includes(item)}
                        onChange={() => toggleEquipment(item)}
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <span className="text-gray-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate My Plan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Plan Results */}
          {plan && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Your Profile</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    BMI: <span className="font-bold text-primary">{plan.bmi}</span>
                  </p>
                  <p className="text-gray-300">
                    Daily Calories:{' '}
                    <span className="font-bold text-primary">{plan.calories} kcal</span>
                  </p>
                </div>
              </div>

              {/* Macros */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Daily Macros</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Proteins</p>
                    <div className="bg-gray-700 rounded h-2">
                      <div
                        className="bg-primary h-2 rounded"
                        style={{
                          width: `${Math.min((plan.macros.proteins / plan.calories) * 100 * 4, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-primary font-bold mt-1">{plan.macros.proteins}g</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Carbs</p>
                    <div className="bg-gray-700 rounded h-2">
                      <div
                        className="bg-accent h-2 rounded"
                        style={{
                          width: `${Math.min((plan.macros.carbs / plan.calories) * 100 * 4, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-accent font-bold mt-1">{plan.macros.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Fats</p>
                    <div className="bg-gray-700 rounded h-2">
                      <div
                        className="bg-green-400 h-2 rounded"
                        style={{
                          width: `${Math.min((plan.macros.fats / plan.calories) * 100 * 9, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-green-400 font-bold mt-1">{plan.macros.fats}g</p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {plan.recommendations.map((rec, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Plan */}
        {plan && (
          <div className="mt-8 card">
            <h3 className="text-2xl font-bold mb-6">Your Weekly Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {plan.weeklyPlan.map((workout, i) => (
                <div
                  key={i}
                  className="bg-dark rounded-lg border border-gray-700 p-4 text-center hover:border-primary transition-all"
                >
                  <p className="font-bold text-primary mb-2">{workout.day}</p>
                  <p className="text-sm mb-2">{workout.exercise}</p>
                  {workout.duration > 0 && (
                    <>
                      <p className="text-xs text-gray-400">{workout.duration} min</p>
                      {workout.sets > 0 && (
                        <p className="text-xs text-gray-400">
                          {workout.sets}x{workout.reps}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
