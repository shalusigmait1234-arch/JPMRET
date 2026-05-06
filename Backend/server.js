import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/db.js';
import Admin from './src/models/Admin.js';
import Stat from './src/models/Stat.js';
import Service from './src/models/Service.js';

import adminRoutes from './src/routes/adminRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import contentRoutes from './src/routes/contentRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
await connectDB();

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/health', healthRoutes);

// Seed Admin if not exists
const seedAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminExists) {
            await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });
            console.log('Admin seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};
seedAdmin();

// Seed initial stats if none exist
const seedStats = async () => {
    try {
        const statsCount = await Stat.countDocuments();
        if (statsCount === 0) {
            const initialStats = [
                { label: "Projects completed", value: "300", target: "+", order: 1 },
                { label: "Communities supported", value: "250", target: "+", order: 2 },
                { label: "Volunteers engaged", value: "550", target: "+", order: 3 },
                { label: "Beneficiaries reached", value: "500", target: "+", order: 4 }
            ];
            await Stat.insertMany(initialStats);
            console.log('Initial stats seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding stats:', error);
    }
};
seedStats();

// Seed initial services if none exist
const seedServices = async () => {
    try {
        const servicesCount = await Service.countDocuments();
        if (servicesCount === 0) {
            const initialServices = [
                { title: "Agriculture development", image: "/assets/img/work/cause-1.jpg", link: "/coverage/agriculture", description: "We promote sustainable farming practices and support farmers with knowledge and resources to improve productivity, increase income.", order: 1 },
                { title: "Local participation and sustainability", image: "/assets/img/work/cause-2.jpg", link: "/coverage/local-participation", description: "We encourage active community involvement to create sustainable solutions that are inclusive, long-lasting, and driven by local.", order: 2 },
                { title: "Transform lives one school at a time", image: "/assets/img/work/cause-3.jpg", link: "/coverage/transform-lives", description: "We work to improve education by supporting schools, enhancing learning environments, and creating opportunities.", order: 3 },
                { title: "Water management", image: "/assets/img/work/cause-4.jpg", link: "/coverage/water-management", description: "We focus on water conservation and efficient management practices to ensure access to clean water and promote sustainable use for communities and agriculture.", order: 4 }
            ];
            await Service.insertMany(initialServices);
            console.log('Initial services seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding services:', error);
    }
};
seedServices();

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
