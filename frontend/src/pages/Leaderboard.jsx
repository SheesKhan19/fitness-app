import { useState, useEffect } from 'react'
import { apiClient } from '@/services/api'
import { Trophy, TrendingUp, Loader } from 'lucide-react'

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await apiClient.get('/auth/leaderboard')
      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
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

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return null
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    )

  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Global <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-gray-400">Rank users by XP and achievement</p>
        </div>

        {/* Top 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {users.slice(0, 3).map((user, index) => (
            <div
              key={user._id}
              className={`card border-2 border-gradient-to-r ${getLevelColor(user.level)} relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2 text-4xl">{getMedalIcon(index + 1)}</div>
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${getLevelColor(user.level)} mx-auto mb-4`}
                />
                <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                <p className="text-accent font-semibold mb-2">#{index + 1}</p>
                <div className="bg-dark rounded-lg p-3">
                  <p className="text-2xl font-bold text-primary">{user.xp} XP</p>
                  <p className="text-gray-400 text-sm">{user.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Top Players</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">User</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Level</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-semibold">XP</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-semibold">Streak</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-700 hover:bg-gray-800/30 transition-colors ${
                      index < 3 ? 'bg-gray-800/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{index + 1}</span>
                        {getMedalIcon(index + 1) && (
                          <span className="text-xl">{getMedalIcon(index + 1)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getLevelColor(user.level)} text-black`}
                      >
                        {user.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-primary">{user.xp} XP</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-accent">
                        <TrendingUp className="w-4 h-4" />
                        <span>{user.streak}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
