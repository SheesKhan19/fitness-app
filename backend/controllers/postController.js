import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

// Create post
export const createPost = async (req, res) => {
  try {
    const { title, description, image } = req.body

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      })
    }

    const post = await Post.create({
      author: req.user._id,
      title,
      description,
      image,
    })

    await post.populate('author', 'name email avatar')

    res.status(201).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get all posts (feed)
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email avatar')
      .populate('comments')
      .sort({ createdAt: -1 })
      .limit(20)

    res.status(200).json({
      success: true,
      data: posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name email avatar',
        },
      })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Like/unlike post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const likeIndex = post.likes.indexOf(req.user._id)

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1)
      post.likesCount -= 1
    } else {
      post.likes.push(req.user._id)
      post.likesCount += 1
    }

    await post.save()
    await post.populate('author', 'name email avatar')

    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Add comment
export const addComment = async (req, res) => {
  try {
    const { content } = req.body

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required',
      })
    }

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const comment = await Comment.create({
      post: req.params.id,
      author: req.user._id,
      content,
    })

    await comment.populate('author', 'name email avatar')

    post.comments.push(comment._id)
    post.commentsCount += 1
    await post.save()

    res.status(201).json({
      success: true,
      data: comment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      })
    }

    await Comment.deleteMany({ post: req.params.id })
    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Post deleted',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
