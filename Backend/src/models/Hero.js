const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Explore More'
  },
  buttonLink: {
    type: String,
    default: '#'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hero', HeroSchema);
