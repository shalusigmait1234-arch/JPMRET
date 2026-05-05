const Benefit = require('../models/Benefit');

 
const getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find().sort('order');
    res.json(benefits);
  } catch (error) {
    console.error('Get benefits error:', error);
    res.status(500).json({ message: 'Server error while fetching benefits' });
  }
};

 
const getAdminBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find().sort('order');
    res.json(benefits);
  } catch (error) {
    console.error('Get admin benefits error:', error);
    res.status(500).json({ message: 'Server error while fetching benefits' });
  }
};

 
const createBenefit = async (req, res) => {
  try {
    const { title, icon, description, order } = req.body;
    
    const benefit = new Benefit({
      title,
      icon,
      description,
      order: order || 0
    });

    const createdBenefit = await benefit.save();
    res.status(201).json(createdBenefit);
  } catch (error) {
    console.error('Create benefit error:', error);
    res.status(500).json({ message: 'Server error while creating benefit' });
  }
};

 
const updateBenefit = async (req, res) => {
  try {
    const { title, icon, description, order } = req.body;
    
    const benefit = await Benefit.findById(req.params.id);

    if (benefit) {
      benefit.title = title !== undefined ? title : benefit.title;
      benefit.icon = icon !== undefined ? icon : benefit.icon;
      benefit.description = description !== undefined ? description : benefit.description;
      benefit.order = order !== undefined ? order : benefit.order;

      const updatedBenefit = await benefit.save();
      res.json(updatedBenefit);
    } else {
      res.status(404).json({ message: 'Benefit not found' });
    }
  } catch (error) {
    console.error('Update benefit error:', error);
    res.status(500).json({ message: 'Server error while updating benefit' });
  }
};

 
const deleteBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findById(req.params.id);

    if (benefit) {
      await benefit.deleteOne();
      res.json({ message: 'Benefit removed' });
    } else {
      res.status(404).json({ message: 'Benefit not found' });
    }
  } catch (error) {
    console.error('Delete benefit error:', error);
    res.status(500).json({ message: 'Server error while deleting benefit' });
  }
};

module.exports = {
  getBenefits,
  getAdminBenefits,
  createBenefit,
  updateBenefit,
  deleteBenefit
};
