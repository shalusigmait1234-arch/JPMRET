import Coverage from '../models/Coverage.js';

// @desc    Get coverage content by slug
// @route   GET /api/content/coverage/:slug
// @access  Public
const getCoverageBySlug = async (req, res) => {
  try {
    const coverage = await Coverage.findOne({ slug: req.params.slug });

    res.json(coverage);
  } catch (error) {
    console.error('Get coverage error:', error);
    res.status(500).json({ message: 'Server error while fetching coverage' });
  }
};

// @desc    Upsert coverage content
// @route   POST /api/admin/coverage
// @access  Private/Admin
const upsertCoverage = async (req, res) => {
  try {
    const { slug, title, image, description, features } = req.body;

    if (!slug || !title || !image || !description) {
      return res.status(400).json({ message: 'Title, Image and Description are required' });
    }

    const coverage = await Coverage.findOneAndUpdate(
      { slug },
      { 
        title, 
        image, 
        description: Array.isArray(description) ? description : [description], 
        features: Array.isArray(features) ? features : []
      },
      { new: true, upsert: true }
    );

    res.json(coverage);
  } catch (error) {
    console.error('Upsert coverage error:', error);
    res.status(500).json({ message: 'Server error while saving coverage content' });
  }
};

export {
  getCoverageBySlug,
  upsertCoverage
};
