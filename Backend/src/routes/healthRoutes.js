import express from 'express';
const router = express.Router();
import { healthCheck } from '../controllers/healthController.js';

router.get('/', healthCheck);

export default router;