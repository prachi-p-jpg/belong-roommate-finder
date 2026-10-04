const Preference = require('../models/Preference');

const createPreferences = async (req, res) => {
  try {
    let pref = await Preference.findOne({ user: req.user.id });
    if (pref) {
      return res.status(400).json({ message: 'Preferences already exist. Use PUT to update.' });
    }
    pref = await Preference.create({ user: req.user.id, ...req.body });
    res.status(201).json(pref);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPreferences = async (req, res) => {
  try {
    const pref = await Preference.findOne({ user: req.user.id });
    if (!pref) return res.status(404).json({ message: 'Preferences not found' });
    res.json(pref);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const pref = await Preference.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!pref) return res.status(404).json({ message: 'Preferences not found' });
    res.json(pref);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createPreferences, getPreferences, updatePreferences };
