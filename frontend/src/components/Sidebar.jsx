import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, X, LayoutGrid, Users, Zap, BookOpen, Award, TrendingUp, User, LogOut } from 'lucide-react'

export default function Sidebar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { label: 'Community', icon: Users, path: '/community' },
    { label: 'AI Coach', icon: Zap, path: '/ai-coach' },
    { label: 'Research', icon: BookOpen, path: '/research' },
    { label: 'Find Coaches', icon: Award, path: '/coaches' },
    { label: 'Leaderboard', icon: TrendingUp, path: '/leaderboard' },
    { label: 'Profile', icon: User, path: '/profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 md:hidden bg-primary p-3 rounded-full"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-dark border-r border-gray-700 transition-all duration-300 z-30 ${
          isOpen ? 'w-64' : 'w-0 -left-64'
        } md:left-0 md:w-64`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700 flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold gradient-text">FitSphere</h1>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div>
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.level}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-dark-hover'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={() => {
              onLogout()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Offset */}
      <div className="md:ml-64 transition-all duration-300" />
    </>
  )
}
