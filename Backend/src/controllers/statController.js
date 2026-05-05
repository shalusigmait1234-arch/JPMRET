import Stat from '../models/Stat.js';

// Get all stats
const getStats = async (req, res) => {
    try {
        const stats = await Stat.find().sort({ order: 1 });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create or Update stat
const saveStat = async (req, res) => {
    const { id, label, value, target, order } = req.body;

    try {
        if (id) {
            const stat = await Stat.findByIdAndUpdate(
                id,
                { label, value, target, order },
                { new: true }
            );
            res.json(stat);
        } else {
            const stat = new Stat({ label, value, target, order });
            await stat.save();
            res.status(201).json(stat);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete stat
const deleteStat = async (req, res) => {
    try {
        await Stat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Stat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getStats,
    saveStat,
    deleteStat
};
