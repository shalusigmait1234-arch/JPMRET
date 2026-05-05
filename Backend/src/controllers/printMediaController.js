import PrintMedia from '../models/PrintMedia.js';

// @desc    Get all print media
// @route   GET /api/content/print-media
// @access  Public
const getPrintMedia = async (req, res) => {
  try {
    const media = await PrintMedia.find().sort({ order: 1, createdAt: -1 });
    res.json(media);
  } catch (error) {
    console.error('Get print media error:', error);
    res.status(500).json({ message: 'Server error while fetching print media' });
  }
};

// @desc    Create print media
// @route   POST /api/admin/print-media
// @access  Private/Admin
const createPrintMedia = async (req, res) => {
  try {
    const { title, url, order } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: 'Title and File URL are required' });
    }

    const media = new PrintMedia({
      title,
      url,
      order: order || 0
    });

    const createdMedia = await media.save();
    res.status(201).json(createdMedia);
  } catch (error) {
    console.error('Create print media error:', error);
    res.status(500).json({ message: 'Server error while creating print media' });
  }
};

// @desc    Update print media
// @route   PATCH /api/admin/print-media/:id
// @access  Private/Admin
const updatePrintMedia = async (req, res) => {
  try {
    const { title, url, order } = req.body;
    const media = await PrintMedia.findById(req.params.id);

    if (media) {
      media.title = title || media.title;
      media.url = url || media.url;
      media.order = order !== undefined ? order : media.order;

      const updatedMedia = await media.save();
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: 'Print media not found' });
    }
  } catch (error) {
    console.error('Update print media error:', error);
    res.status(500).json({ message: 'Server error while updating print media' });
  }
};

// @desc    Delete print media
// @route   DELETE /api/admin/print-media/:id
// @access  Private/Admin
const deletePrintMedia = async (req, res) => {
  try {
    const media = await PrintMedia.findById(req.params.id);
    if (media) {
      await media.deleteOne();
      res.json({ message: 'Print media removed' });
    } else {
      res.status(404).json({ message: 'Print media not found' });
    }
  } catch (error) {
    console.error('Delete print media error:', error);
    res.status(500).json({ message: 'Server error while deleting print media' });
  }
};

export {
  getPrintMedia,
  createPrintMedia,
  updatePrintMedia,
  deletePrintMedia
};
