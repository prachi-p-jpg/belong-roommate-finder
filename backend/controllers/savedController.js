const Saved = require('../models/Saved');

const saveListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const saved = await Saved.create({ user: req.user.id, listing: listingId });
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Listing already saved' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSavedListings = async (req, res) => {
  try {
    const saved = await Saved.find({ user: req.user.id }).populate('listing');
    res.json(saved.map(s => s.listing));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeSavedListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    await Saved.findOneAndDelete({ user: req.user.id, listing: listingId });
    res.json({ message: 'Removed from saved listings' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { saveListing, getSavedListings, removeSavedListing };
