import mongoose from 'mongoose';

const benefitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: 'fa fa-check'
  },
  description: {
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

const Benefit = mongoose.model('Benefit', benefitSchema);
export default Benefit;
