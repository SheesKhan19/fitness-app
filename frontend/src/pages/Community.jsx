import { useState, useEffect } from 'react'
import { apiClient } from '@/services/api'
import { Heart, MessageCircle, Share2, Loader } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', description: '', image: '' })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/posts')
      setPosts(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.post('/posts', newPost)
      setPosts([response.data.data, ...posts])
      setNewPost({ title: '', description: '', image: '' })
      setShowNewPost(false)
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleLike = async (postId) => {
    try {
      const response = await apiClient.post(`/posts/${postId}/like`)
      setPosts(posts.map((p) => (p._id === postId ? response.data.data : p)))
    } catch (error) {
      console.error('Error liking post:', error)
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Community <span className="gradient-text">Feed</span>
          </h1>
          <p className="text-gray-400">Share your fitness journey and inspire others</p>
        </div>

        {/* New Post Button */}
        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="btn-primary w-full mb-6"
        >
          + Create Post
        </button>

        {/* New Post Form */}
        {showNewPost && (
          <div className="card mb-6">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="input-field"
                required
              />
              <textarea
                placeholder="What's on your mind? Share your fitness journey..."
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                className="input-field h-24 resize-none"
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={newPost.image}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                className="input-field"
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1">
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="card">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-semibold text-white">{post.author?.name}</p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.description}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              {/* Engagement */}
              <div className="flex items-center justify-between text-gray-400 border-t border-gray-700 pt-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likesCount}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.commentsCount}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
