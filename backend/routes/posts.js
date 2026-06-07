import express from 'express'
import { createPost, getFeed, getPost, toggleLike, addComment, deletePost } from '../controllers/postController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createPost)
router.get('/', getFeed)
router.get('/:id', getPost)
router.post('/:id/like', protect, toggleLike)
router.post('/:id/comment', protect, addComment)
router.delete('/:id', protect, deletePost)

export default router
