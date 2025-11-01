const express = require('express');
const Blog = require('../models/Blog');
const { authenticateToken } = require('../middleware/auth');
const slugify = require('slugify');

const router = express.Router();

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .select('-body'); // Don't send full body in list view

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true })
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create blog post (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, body, coverImage, tags, published } = req.body;

    if (!title || !excerpt || !body) {
      return res.status(400).json({ error: 'Title, excerpt, and body are required' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existingPost = await Blog.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ error: 'A post with this title already exists' });
    }

    const post = new Blog({
      title,
      slug,
      excerpt,
      body,
      coverImage: coverImage || '',
      tags: tags || [],
      author: req.user._id,
      published: published !== undefined ? published : true
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog post (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only author or admin can update
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, excerpt, body, coverImage, tags, published } = req.body;

    if (title) {
      post.title = title;
      const newSlug = slugify(title, { lower: true, strict: true });
      if (newSlug !== post.slug) {
        const existingPost = await Blog.findOne({ slug: newSlug });
        if (!existingPost || existingPost._id.toString() === post._id.toString()) {
          post.slug = newSlug;
        }
      }
    }
    if (excerpt) post.excerpt = excerpt;
    if (body) post.body = body;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (tags) post.tags = tags;
    if (published !== undefined) post.published = published;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog post (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only author or admin can delete
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

