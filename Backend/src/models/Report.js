import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    trim: true
  },
  label: {
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

const Report = mongoose.model('Report', reportSchema);
export default Report;
