import mongoose from 'mongoose';

const printMediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const PrintMedia = mongoose.model('PrintMedia', printMediaSchema);
export default PrintMedia;
