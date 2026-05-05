import mongoose from 'mongoose';

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

const Coverage = mongoose.model('Coverage', coverageSchema);
export default Coverage;
