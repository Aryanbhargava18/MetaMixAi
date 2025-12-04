const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// CREATE: Add a new chat
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { modelId, prompt, response, type, params, context } = req.body;

    if (!modelId || !prompt || !response) {
      return res.status(400).json({ success: false, message: 'modelId, prompt, and response are required' });
    }

    const chat = new Chat({
      userId: req.user.id,
      modelId,
      prompt,
      response,
      type: type || 'text',
      params: params || {},
      context: context || ''
    });

    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (err) {
    console.error('❌ CREATE CHAT ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// READ: Get chats with pagination, search, sort, filter
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'timestamp', sortOrder = 'desc', modelId, type } = req.query;

    const query = { userId: req.user.id };

    // Search filter
    if (search) {
      query.$or = [
        { prompt: { $regex: search, $options: 'i' } },
        { response: { $regex: search, $options: 'i' } }
      ];
    }

    // Additional filters
    if (modelId) query.modelId = modelId;
    if (type) query.type = type;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (page - 1) * limit;

    const chats = await Chat.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email');

    const total = await Chat.countDocuments(query);

    res.json({
      success: true,
      chats,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalChats: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('❌ GET CHATS ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// READ: Get single chat by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.json({ success: true, chat });
  } catch (err) {
    console.error('❌ GET CHAT ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// UPDATE: Update a chat
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { prompt, response, type, params, context } = req.body;

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { prompt, response, type, params, context },
      { new: true, runValidators: true }
    );

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.json({ success: true, chat });
  } catch (err) {
    console.error('❌ UPDATE CHAT ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE: Delete a chat
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.json({ success: true, message: 'Chat deleted successfully' });
  } catch (err) {
    console.error('❌ DELETE CHAT ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
