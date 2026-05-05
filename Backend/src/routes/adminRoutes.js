const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, getDashboardStats } = require('../controllers/adminController');
const { getInquiries, updateInquiryStatus } = require('../controllers/contactController');
const { updateHero, getAllHeroes, createHero, deleteHero } = require('../controllers/heroController');
const { getStats, saveStat, deleteStat } = require('../controllers/statController');
const { getServices, saveService, deleteService } = require('../controllers/serviceController');
const { getAdminBenefits, createBenefit, updateBenefit, deleteBenefit } = require('../controllers/benefitController');
const { getAdminGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { upsertCoverage } = require('../controllers/coverageController');
const { createReport, updateReport, deleteReport } = require('../controllers/reportController');
const { createPrintMedia, updatePrintMedia, deletePrintMedia } = require('../controllers/printMediaController');
const { protect } = require('../middleware/authMiddleware');

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
router.post('/reports', protect, createReport);
router.patch('/reports/:id', protect, updateReport);
router.delete('/reports/:id', protect, deleteReport);

// Print Media Management
router.post('/print-media', protect, createPrintMedia);
router.patch('/print-media/:id', protect, updatePrintMedia);
router.delete('/print-media/:id', protect, deletePrintMedia);

module.exports = router;
