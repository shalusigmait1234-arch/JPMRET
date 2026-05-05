const Gallery = require('../models/Gallery');


const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort('order');
    res.json(images);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error while fetching gallery' });
  }
};


const getAdminGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort('-createdAt'); // Sort by newest first in admin by default
    res.json(images);
  } catch (error) {
    console.error('Get admin gallery error:', error);
    res.status(500).json({ message: 'Server error while fetching gallery' });
  }
};


const createGalleryImage = async (req, res) => {
  try {
    const { image, caption, category, order } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const galleryImage = new Gallery({
      image,
      caption: caption || '',
      category: category || 'General',
      order: order || 0
    });

    const createdImage = await galleryImage.save();
    res.status(201).json(createdImage);
  } catch (error) {
    console.error('Create gallery image error:', error);
    res.status(500).json({ message: 'Server error while creating gallery image' });
  }
};

const updateGalleryImage = async (req, res) => {
  try {
    const { image, caption, category, order } = req.body;

    const galleryImage = await Gallery.findById(req.params.id);

    if (galleryImage) {
      galleryImage.image = image !== undefined ? image : galleryImage.image;
      galleryImage.caption = caption !== undefined ? caption : galleryImage.caption;
      galleryImage.category = category !== undefined ? category : galleryImage.category;
      galleryImage.order = order !== undefined ? order : galleryImage.order;

      const updatedImage = await galleryImage.save();
      res.json(updatedImage);
    } else {
      res.status(404).json({ message: 'Gallery image not found' });
    }
  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({ message: 'Server error while updating gallery image' });
  }
};


const deleteGalleryImage = async (req, res) => {
  try {
    const galleryImage = await Gallery.findById(req.params.id);

    if (galleryImage) {
      await galleryImage.deleteOne();
      res.json({ message: 'Gallery image removed' });
    } else {
      res.status(404).json({ message: 'Gallery image not found' });
    }
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({ message: 'Server error while deleting gallery image' });
  }
};

module.exports = {
  getGallery,
  getAdminGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
};
