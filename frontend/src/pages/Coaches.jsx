import { useState, useEffect } from 'react'
import { apiClient } from '@/services/api'
import { Star, Award, User, Loader, CheckCircle } from 'lucide-react'

export default function Coaches() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [bookedTrainer, setBookedTrainer] = useState(null)

  const specialties = [
    'Fat Loss',
    'Bodybuilding',
    'Powerlifting',
    "Women's Fitness",
    'Sports Performance',
    'Nutrition',
  ]

  useEffect(() => {
    fetchTrainers()
  }, [selectedSpecialty])

  const fetchTrainers = async () => {
    try {
      const params = selectedSpecialty ? `?specialty=${selectedSpecialty}` : ''
      const response = await apiClient.get(`/trainers${params}`)
      setTrainers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching trainers:', error)
      setLoading(false)
    }
  }

  const handleBookConsultation = async (trainerId) => {
    try {
      const response = await apiClient.post('/trainers/book', { trainerId })
      setBookedTrainer(trainerId)
      setTimeout(() => setBookedTrainer(null), 2000)
    } catch (error) {
      console.error('Error booking consultation:', error)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 text-primary animate-spin" />
      </div>
    )

  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Find Your <span className="gradient-text">Coach</span>
          </h1>
          <p className="text-gray-400">Connect with certified fitness professionals</p>
        </div>

        {/* Specialty Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialty('')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedSpecialty === ''
                ? 'bg-primary text-white'
                : 'bg-dark border border-gray-700 text-gray-300 hover:border-primary'
            }`}
          >
            All
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedSpecialty === specialty
                  ? 'bg-primary text-white'
                  : 'bg-dark border border-gray-700 text-gray-300 hover:border-primary'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Success Message */}
        {bookedTrainer && (
          <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg px-4 py-3 flex items-center gap-2 text-green-300">
            <CheckCircle className="w-5 h-5" />
            Consultation booking request sent!
          </div>
        )}

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="card hover:border-primary transition-all">
              {/* Image */}
              <div className="w-full h-40 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold mb-1">{trainer.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(trainer.rating) ? 'fill-yellow-400' : 'opacity-30'}`}
                      />
                    ))}
                </div>
                <span className="text-sm text-gray-400">{trainer.reviews} reviews</span>
              </div>

              {/* Experience */}
              <p className="text-sm text-gray-400 mb-2">{trainer.experience} years experience</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-4">
                {trainer.specialty.slice(0, 2).map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Rate */}
              <p className="text-primary font-bold mb-4">${trainer.hourlyRate}/hour</p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="btn-outline flex-1 text-sm">View Profile</button>
                <button
                  onClick={() => handleBookConsultation(trainer._id)}
                  className="btn-primary flex-1 text-sm"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
