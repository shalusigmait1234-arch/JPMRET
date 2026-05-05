const express = require('express');
const router = express.Router();
const { getHero } = require('../controllers/heroController');
const { getStats } = require('../controllers/statController');
const { getServices } = require('../controllers/serviceController');
const { getBenefits } = require('../controllers/benefitController');
const { getGallery } = require('../controllers/galleryController');
const { getTestimonials } = require('../controllers/testimonialController');
const { getCoverageBySlug } = require('../controllers/coverageController');
const { getReports } = require('../controllers/reportController');
const { getPrintMedia } = require('../controllers/printMediaController');

router.get('/hero', getHero);
router.get('/stats', getStats);
router.get('/services', getServices);
router.get('/benefits', getBenefits);
router.get('/gallery', getGallery);
router.get('/testimonials', getTestimonials);
router.get('/coverage/:slug', getCoverageBySlug);
router.get('/reports', getReports);
router.get('/print-media', getPrintMedia);

module.exports = router;
