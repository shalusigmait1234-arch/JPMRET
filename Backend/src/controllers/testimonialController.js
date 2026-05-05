const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/content/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort('order');
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Server error while fetching testimonials' });
  }
};

// @desc    Get all testimonials for admin
// @route   GET /api/admin/testimonials
// @access  Private/Admin
const getAdminTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort('order');
    res.json(testimonials);
  } catch (error) {
    console.error('Get admin testimonials error:', error);
    res.status(500).json({ message: 'Server error while fetching testimonials' });
  }
};

// @desc    Create a testimonial
// @route   POST /api/admin/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res) => {
  try {
    const { name, role, text, img, order } = req.body;

    if (!name || !role || !text || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const testimonial = new Testimonial({
      name,
      role,
      text,
      img,
      order: order || 0
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error while creating testimonial' });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private/Admin
const updateTestimonial = async (req, res) => {
  try {
    const { name, role, text, img, order } = req.body;
    
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.name = name || testimonial.name;
      testimonial.role = role || testimonial.role;
      testimonial.text = text || testimonial.text;
      testimonial.img = img || testimonial.img;
      testimonial.order = order !== undefined ? order : testimonial.order;

      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Server error while updating testimonial' });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Server error while deleting testimonial' });
  }
};

module.exports = {
  getTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
