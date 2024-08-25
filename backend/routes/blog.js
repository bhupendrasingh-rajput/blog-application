const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById } = require('../controllers/blog');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlogById);
router.delete('/:id', authMiddleware, deleteBlogById);

module.exports = router;