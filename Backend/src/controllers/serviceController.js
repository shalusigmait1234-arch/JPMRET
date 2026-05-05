import Service from '../models/Service.js';

// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create or Update service
const saveService = async (req, res) => {
    const { id, title, description, image, link, order } = req.body;

    try {
        if (id) {
            const service = await Service.findByIdAndUpdate(
                id,
                { title, description, image, link, order },
                { new: true }
            );
            res.json(service);
        } else {
            const service = new Service({ title, description, image, link, order });
            await service.save();
            res.status(201).json(service);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete service
const deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getServices,
    saveService,
    deleteService
};
