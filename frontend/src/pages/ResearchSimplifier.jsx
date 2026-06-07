import { useState } from 'react'
import { BookOpen, CheckCircle, AlertCircle, Zap } from 'lucide-react'

export default function ResearchSimplifier() {
  const [input, setInput] = useState('')
  const [inputType, setInputType] = useState('article')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const mockAnalysis = {
    summary:
      'This comprehensive study explores the effects of high-intensity interval training (HIIT) on metabolic rate and fat loss. The research involved 150 participants over 12 weeks.',
    findings: [
      'HIIT increases metabolic rate by 24% post-workout',
      'Participants lost average 8kg in 12 weeks',
      'Muscle preservation was 95% vs traditional cardio',
      'EPOC effect lasted 48 hours post-workout',
    ],
    takeaways: [
      '20-30 minute HIIT sessions 3x per week are optimal',
      'HIIT is effective for both fat loss and muscle retention',
      'Recovery between sessions is crucial (48 hours)',
      'Combined with strength training yields best results',
    ],
    reliability: {
      score: 8.5,
      reason: 'Peer-reviewed study with large sample size and proper methodology',
    },
  }

  const handleAnalyze = () => {
    if (!input.trim()) return

    setLoading(true)
    setTimeout(() => {
      setResult(mockAnalysis)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gradient-to-br from-darker via-dark to-darker">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Research <span className="gradient-text">Simplifier</span>
          </h1>
          <p className="text-gray-400">
            Paste fitness articles or research papers to get instant summaries
          </p>
        </div>

        {/* Input Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Paste Your Content</h2>

          {/* Input Type Selector */}
          <div className="flex gap-2 mb-4">
            {['article', 'abstract', 'url'].map((type) => (
              <button
                key={type}
                onClick={() => setInputType(type)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  inputType === type
                    ? 'bg-primary text-white'
                    : 'bg-dark border border-gray-700 text-gray-300 hover:border-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <textarea
            placeholder="Paste the fitness article, research abstract, or URL..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field h-32 resize-none mb-4"
          />

          <button onClick={handleAnalyze} disabled={loading || !input.trim()} className="btn-primary w-full">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Summary
              </h3>
              <p className="text-gray-300">{result.summary}</p>
            </div>

            {/* Reliability Score */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Reliability Score
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-4"
                      style={{ width: `${(result.reliability.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">{result.reliability.score}/10</p>
              </div>
              <p className="text-gray-400 text-sm mt-2">{result.reliability.reason}</p>
            </div>

            {/* Key Findings */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Key Findings</h3>
              <ul className="space-y-2">
                {result.findings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Takeaways */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Practical Takeaways</h3>
              <ul className="space-y-2">
                {result.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div className="card text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400">Paste a fitness article or research paper to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
