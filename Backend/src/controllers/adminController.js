import Admin from '../models/Admin.js';
import Hero from '../models/Hero.js';
import Contact from '../models/Contact.js';
import Stat from '../models/Stat.js';
import Service from '../models/Service.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const heroCount = await Hero.countDocuments();
    const inquiryCount = await Contact.countDocuments();
    const statCount = await Stat.countDocuments();
    const serviceCount = await Service.countDocuments();
    // Placeholder for reports and gallery until models are implemented
    const reportCount = 0;
    const galleryCount = 0;

    res.json({
      heroes: heroCount,
      inquiries: inquiryCount,
      stats: statCount,
      services: serviceCount,
      reports: reportCount,
      gallery: galleryCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  loginAdmin,
  getAdminProfile,
  getDashboardStats
};
