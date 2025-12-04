const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modelId: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'audio', 'video'],
    default: 'text'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  params: {
    type: Object,
    default: {}
  },
  context: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Chat', chatSchema);
