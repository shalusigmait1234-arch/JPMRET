const Report = require('../models/Report');

// @desc    Get all reports
// @route   GET /api/content/reports
// @access  Public
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ order: 1, createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
};

// @desc    Create a report
// @route   POST /api/admin/reports
// @access  Private/Admin
const createReport = async (req, res) => {
  try {
    const { year, label, url, order } = req.body;

    if (!year || !label || !url) {
      return res.status(400).json({ message: 'Year, Label and File URL are required' });
    }

    const report = new Report({
      year,
      label,
      url,
      order: order || 0
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error while creating report' });
  }
};

// @desc    Update a report
// @route   PATCH /api/admin/reports/:id
// @access  Private/Admin
const updateReport = async (req, res) => {
  try {
    const { year, label, url, order } = req.body;
    const report = await Report.findById(req.params.id);

    if (report) {
      report.year = year || report.year;
      report.label = label || report.label;
      report.url = url || report.url;
      report.order = order !== undefined ? order : report.order;

      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error while updating report' });
  }
};

// @desc    Delete a report
// @route   DELETE /api/admin/reports/:id
// @access  Private/Admin
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (report) {
      await report.deleteOne();
      res.json({ message: 'Report removed' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Server error while deleting report' });
  }
};

module.exports = {
  getReports,
  createReport,
  updateReport,
  deleteReport
};
