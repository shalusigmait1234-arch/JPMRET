import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    target: {
        type: String,
        default: '+'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Stat = mongoose.model('Stat', statSchema);
export default Stat;
