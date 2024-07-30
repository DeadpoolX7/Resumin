const Resume = require('../models/resume.model');
const generatePDF = require('../utils/generatePDF');

exports.createResume = async (req, res) => {
  try {
    const { name, about, skills, email, phone } = req.body;
    const newResume = new Resume({
      user: req.user.id,
      name,
      about,
      skills: skills.split(',').map(skill => skill.trim()),
      email,
      phone
    });

    await newResume.save();

    res.json({ resumeId: newResume._id });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error getting resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const pdfBuffer = await generatePDF(resume);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Server error' });
  }
};