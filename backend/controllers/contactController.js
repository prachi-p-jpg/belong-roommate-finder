const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please provide name, email and message" });
    }
    
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ message: "Contact message stored successfully", contact });
  } catch (error) {
    console.error("Error in submitContact:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { submitContact };
