import express from 'express';
const router = express.Router();
import { submitInquiry } from '../controllers/contactController.js';

router.post('/', submitInquiry);

export default router;
