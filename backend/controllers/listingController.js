const Listing = require('../models/Listing');
const Preference = require('../models/Preference');

const getListings = async (req, res) => {
  try {
    const { location, budget, roomType, sharing, smoking, pets, search, page = 1, limit = 4 } = req.query;
    
    let query = {};
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (budget) {
      query.rent = { $lte: Number(budget) };
    }
    if (roomType) {
      query.roomType = roomType;
    }
    if (sharing) {
      query.sharing = sharing;
    }
    if (smoking && smoking !== "Doesn't matter") {
      query.smoking = smoking;
    }
    if (pets && pets !== "Doesn't matter") {
      query.pets = pets;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const totalListings = await Listing.countDocuments(query);
    const listings = await Listing.find(query).skip(skip).limit(Number(limit));
    
    res.json({
      listings,
      totalPages: Math.ceil(totalListings / Number(limit)) || 1,
      totalListings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Calculate Match MVP logic
const calculateMatch = async (req, res) => {
  try {
    const { listingId } = req.params;
    const pref = await Preference.findOne({ user: req.user.id });
    const listing = await Listing.findById(listingId);

    if (!pref || !listing) {
      return res.status(404).json({ message: 'Preference or Listing not found' });
    }

    let score = 0;
    let totalCriteria = 0;

    const compare = (p, l) => {
      if (p) {
        totalCriteria++;
        if (p.toLowerCase() === l?.toLowerCase()) score++;
      }
    };

    compare(pref.location, listing.location);
    compare(pref.roomType, listing.roomType);
    compare(pref.sharing, listing.sharing);
    compare(pref.sleepSchedule, listing.sleepSchedule);
    compare(pref.smoking, listing.smoking);
    compare(pref.pets, listing.pets);
    compare(pref.guests, listing.guests);
    compare(pref.social, listing.social);
    compare(pref.cleanliness, listing.cleanliness);

    if (pref.maxBudget && listing.rent) {
      totalCriteria++;
      if (listing.rent <= pref.maxBudget) score++;
    }

    const percentage = totalCriteria === 0 ? 0 : Math.round((score / totalCriteria) * 100);

    res.json({
      matchPercentage: percentage,
      details: {
        score,
        totalCriteria,
        pref,
        listing
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getListings, getListingById, createListing, calculateMatch };
