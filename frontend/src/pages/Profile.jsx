import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Edit2, Save, X } from 'lucide-react'
import useAuthStore from '@/store/authStore'
import { authAPI } from '@/services/api'

export default function Profile() {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    fitnessGoal: user?.fitnessGoal || '',
    bio: user?.bio || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await authAPI.updateProfile(formData)
      setUser(response.data.user)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelColor = (level) => {
    const colors = {
      Bronze: 'from-orange-600 to-orange-400',
      Silver: 'from-gray-400 to-gray-300',
      Gold: 'from-yellow-600 to-yellow-400',
      Platinum: 'from-cyan-400 to-blue-400',
      Elite: 'from-purple-600 to-pink-600',
    }
    return colors[level] || 'from-gray-600 to-gray-400'
  }

  const calculateBMI = () => {
    if (user?.weight && user?.height) {
      return (user.weight / ((user.height / 100) ** 2)).toFixed(1)
    }
    return 'N/A'
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-gray-400">View and manage your fitness profile</p>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="card text-center mb-6">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${getLevelColor(user?.level)} mx-auto mb-4`}
              />
              <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
              <p className="text-accent font-semibold mb-1">{user?.email}</p>
              <div
                className={`inline-block px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r ${getLevelColor(user?.level)} text-black`}
              >
                {user?.level}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="card">
                <p className="text-gray-400 text-sm mb-1">Total XP</p>
                <p className="text-3xl font-bold text-primary">{user?.xp || 0}</p>
              </div>
              <div className="card">
                <p className="text-gray-400 text-sm mb-1">Streak</p>
                <p className="text-3xl font-bold text-accent">{user?.streak || 0} days</p>
              </div>
              <div className="card">
                <p className="text-gray-400 text-sm mb-1">Followers</p>
                <p className="text-3xl font-bold text-primary">{user?.followers?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {!isEditing ? (
              <>
                {/* Bio */}
                {user?.bio && (
                  <div className="card mb-6">
                    <h3 className="text-lg font-bold mb-2">Bio</h3>
                    <p className="text-gray-300">{user.bio}</p>
                  </div>
                )}

                {/* Fitness Info */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4">Fitness Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Age</p>
                      <p className="text-xl font-bold">{user?.age}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Gender</p>
                      <p className="text-xl font-bold">{user?.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Weight</p>
                      <p className="text-xl font-bold">{user?.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Height</p>
                      <p className="text-xl font-bold">{user?.height} cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">BMI</p>
                      <p className="text-xl font-bold text-primary">{calculateBMI()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Goal</p>
                      <p className="text-xl font-bold text-accent">{user?.fitnessGoal}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Edit Form */}
                <div className="card space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="input-field h-20 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
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
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Goal</label>
                      <select
                        name="fitnessGoal"
                        value={formData.fitnessGoal}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Endurance">Endurance</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="General Fitness">General Fitness</option>
                        <option value="Athletic Performance">Athletic Performance</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-outline w-full flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
