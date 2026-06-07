import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Heart, Zap, Users, Trophy, TrendingUp, Target, Flame } from 'lucide-react'
import useAuthStore from '@/store/authStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  // Calculate level progress
  const levelThresholds = {
    Bronze: 0,
    Silver: 1000,
    Gold: 2500,
    Platinum: 4000,
    Elite: 6000,
  }

  const currentLevelThreshold = levelThresholds[user.level] || 0
  const nextLevelThreshold =
    Object.values(levelThresholds).find((threshold) => threshold > currentLevelThreshold) || 6000
  const progressPercentage =
    ((user.xp - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-darker w-full">
      {/* Header with User Info */}
      <div className="bg-dark border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">FitSphere Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.name}</span>!
          </h2>
          <p className="text-gray-400">Let's crush your fitness goals today</p>
        </div>

        {/* Level & XP Card */}
        <div className={`card mb-8 bg-gradient-to-r ${getLevelColor(user.level)} p-6 text-black`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-80">Current Level</p>
              <h3 className="text-4xl font-bold">{user.level}</h3>
            </div>
            <Trophy className="w-12 h-12 opacity-80" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{user.xp} XP</span>
              <span>{nextLevelThreshold} XP</span>
            </div>
            <div className="bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white/80 h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* XP Card */}
          <div className="card group hover:border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total XP</p>
                <p className="text-3xl font-bold">{user.xp}</p>
              </div>
              <Zap className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Streak Card */}
          <div className="card group hover:border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                <p className="text-3xl font-bold">{user.streak} days</p>
              </div>
              <Flame className="w-8 h-8 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Followers Card */}
          <div className="card group hover:border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Followers</p>
                <p className="text-3xl font-bold">{user.followers?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Goal Card */}
          <div className="card group hover:border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Your Goal</p>
                <p className="text-lg font-bold">{user.fitnessGoal}</p>
              </div>
              <Target className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/community')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Community Feed</h3>
            </div>
            <p className="text-gray-400 text-sm">Share & inspire the fitness community</p>
          </button>

          <button
            onClick={() => navigate('/ai-coach')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">AI Coach</h3>
            </div>
            <p className="text-gray-400 text-sm">Get personalized workout plans</p>
          </button>

          <button
            onClick={() => navigate('/coaches')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Find Coaches</h3>
            </div>
            <p className="text-gray-400 text-sm">Connect with certified trainers</p>
          </button>
        </div>

        {/* More Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/research')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold">Research Simplifier</h3>
            </div>
            <p className="text-gray-400 text-sm">Analyze fitness articles & research</p>
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold">Leaderboard</h3>
            </div>
            <p className="text-gray-400 text-sm">See global rankings & compete</p>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="card cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold">My Profile</h3>
            </div>
            <p className="text-gray-400 text-sm">View and manage your profile</p>
          </button>
        </div>

        {/* User Info Section */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Your Fitness Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">Age</p>
              <p className="text-2xl font-bold">{user.age}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Weight</p>
              <p className="text-2xl font-bold">{user.weight} kg</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Height</p>
              <p className="text-2xl font-bold">{user.height} cm</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Gender</p>
              <p className="text-2xl font-bold">{user.gender}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Level</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${getLevelColor(user.level)} bg-clip-text text-transparent`}>
                {user.level}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
