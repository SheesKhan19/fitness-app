import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Heart } from 'lucide-react'
import { authAPI } from '@/services/api'
import useAuthStore from '@/store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { setUser, setToken, setError } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setLocalError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLocalError('')

    try {
      const { data } = await authAPI.login(formData.email, formData.password)
      setToken(data.token)
      setUser(data.user)
      navigate('/dashboard')
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setLocalError(message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-darker flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-text">FitSphere</h1>
          </div>
          <p className="text-gray-400">Pakistan's AI-Powered Fitness Ecosystem</p>
        </div>

        {/* Login Card */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Welcome Back</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 mb-6 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a href="#" className="text-primary hover:text-accent transition-colors text-sm font-medium">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-accent font-semibold transition-colors">
            Create one now
          </Link>
        </div>
      </div>
    </div>
  )
}
