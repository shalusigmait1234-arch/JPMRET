import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
