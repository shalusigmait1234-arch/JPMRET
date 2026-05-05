import express from 'express';
const router = express.Router();
import { getHero } from '../controllers/heroController.js';
import { getStats } from '../controllers/statController.js';
import { getServices } from '../controllers/serviceController.js';
import { getBenefits } from '../controllers/benefitController.js';
import { getGallery } from '../controllers/galleryController.js';
import { getTestimonials } from '../controllers/testimonialController.js';
import { getCoverageBySlug } from '../controllers/coverageController.js';
import { getReports } from '../controllers/reportController.js';
import { getPrintMedia } from '../controllers/printMediaController.js';

router.get('/hero', getHero);
router.get('/stats', getStats);
router.get('/services', getServices);
router.get('/benefits', getBenefits);
router.get('/gallery', getGallery);
router.get('/testimonials', getTestimonials);
router.get('/coverage/:slug', getCoverageBySlug);
router.get('/reports', getReports);
router.get('/print-media', getPrintMedia);

export default router;
