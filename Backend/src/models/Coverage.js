const mongoose = require('mongoose');

const coverageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: [String], // Array of paragraphs
    required: true
  },
  features: {
    type: [String], // Array of bullet points
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coverage', coverageSchema);
