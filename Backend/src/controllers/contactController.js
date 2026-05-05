import Contact from '../models/Contact.js';

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const inquiry = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
