import express from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    url: req.file.path, // This contains the full Cloudinary URL
    filename: req.file.filename
  });
});

export default router;
