const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  // Construct the file path (relative to the server root)
  const filePath = `/uploads/${req.file.filename}`;

  res.status(200).json({
    message: 'File uploaded successfully',
    url: filePath,
    filename: req.file.filename
  });
});

module.exports = router;
