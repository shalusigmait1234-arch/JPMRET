import express from 'express';
const router = express.Router();
import { loginAdmin, getAdminProfile, getDashboardStats } from '../controllers/adminController.js';
import { getInquiries, updateInquiryStatus } from '../controllers/contactController.js';
import { updateHero, getAllHeroes, createHero, deleteHero } from '../controllers/heroController.js';
import { getStats, saveStat, deleteStat } from '../controllers/statController.js';
import { getServices, saveService, deleteService } from '../controllers/serviceController.js';
import { getAdminBenefits, createBenefit, updateBenefit, deleteBenefit } from '../controllers/benefitController.js';
import { getAdminGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { upsertCoverage } from '../controllers/coverageController.js';
import { getReports, createReport, updateReport, deleteReport } from '../controllers/reportController.js';
import { getPrintMedia, createPrintMedia, updatePrintMedia, deletePrintMedia } from '../controllers/printMediaController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.get('/stats', protect, getDashboardStats);

// Inquiry Management
router.get('/inquiries', protect, getInquiries);
router.patch('/inquiries/:id', protect, updateInquiryStatus);

// Hero Management
router.get('/hero', protect, getAllHeroes);
router.post('/hero', protect, createHero);
router.patch('/hero/:id', protect, updateHero);
router.delete('/hero/:id', protect, deleteHero);

// Stat Management
router.get('/stats-list', protect, getStats);
router.post('/stats', protect, saveStat);
router.delete('/stats/:id', protect, deleteStat);

// Service Management
router.get('/services-list', protect, getServices);
router.post('/services', protect, saveService);
router.delete('/services/:id', protect, deleteService);

// Benefit Management
router.get('/benefits-list', protect, getAdminBenefits);
router.post('/benefits', protect, createBenefit);
router.patch('/benefits/:id', protect, updateBenefit);
router.delete('/benefits/:id', protect, deleteBenefit);

// Gallery Management
router.get('/gallery-list', protect, getAdminGallery);
router.post('/gallery', protect, createGalleryImage);
router.patch('/gallery/:id', protect, updateGalleryImage);
router.delete('/gallery/:id', protect, deleteGalleryImage);

// Testimonial Management
router.get('/testimonials-list', protect, getAdminTestimonials);
router.post('/testimonials', protect, createTestimonial);
router.patch('/testimonials/:id', protect, updateTestimonial);
router.delete('/testimonials/:id', protect, deleteTestimonial);

// Coverage Management
router.post('/coverage', protect, upsertCoverage);

// Reports Management
router.get('/reports', protect, getReports);
router.post('/reports', protect, createReport);
router.patch('/reports/:id', protect, updateReport);
router.delete('/reports/:id', protect, deleteReport);

// Print Media Management
router.get('/print-media', protect, getPrintMedia);
router.post('/print-media', protect, createPrintMedia);
router.patch('/print-media/:id', protect, updatePrintMedia);
router.delete('/print-media/:id', protect, deletePrintMedia);

export default router;
