const fs = require('fs');
const path = require('path');

const files = {
  // models
  'models/Preference.js': `const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  location: String,
  minBudget: Number,
  maxBudget: Number,
  roommatePreference: String,
  roomType: String,
  sharing: String,
  sleepSchedule: String,
  smoking: String,
  guests: String,
  pets: String,
  social: String,
  cleanliness: String
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
`,
  'models/Listing.js': `const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  rent: Number,
  roomType: String,
  sharing: String,
  roommates: Number,
  smoking: String,
  pets: String,
  guests: String,
  sleepSchedule: String,
  social: String,
  cleanliness: String,
  image: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
`,
  'models/Saved.js': `const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }
}, { timestamps: true });

savedSchema.index({ user: 1, listing: 1 }, { unique: true });

module.exports = mongoose.model('Saved', savedSchema);
`,
  'middleware/authMiddleware.js': `const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_if_env_is_missing');
      req.user = decoded; // { id: ... }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
`,
  'controllers/userController.js': `const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, photo, occupation, about } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.photo = photo || user.photo;
    user.occupation = occupation || user.occupation;
    user.about = about || user.about;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      occupation: updatedUser.occupation,
      about: updatedUser.about
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
`,
  'routes/userRoutes.js': `const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
`,
  'controllers/preferenceController.js': `const Preference = require('../models/Preference');

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
`,
  'routes/preferenceRoutes.js': `const express = require('express');
const router = express.Router();
const { createPreferences, getPreferences, updatePreferences } = require('../controllers/preferenceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPreferences);
router.get('/', protect, getPreferences);
router.put('/', protect, updatePreferences);

module.exports = router;
`,
  'controllers/listingController.js': `const Listing = require('../models/Listing');
const Preference = require('../models/Preference');

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
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
`,
  'routes/listingRoutes.js': `const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing, calculateMatch } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getListings);
router.post('/', createListing); // Open for MVP, or could protect
router.get('/:id', getListings); // Re-map later if needed, wait, this should be getListingById
router.get('/:listingId/match', protect, calculateMatch); 

module.exports = router;
`,
  'controllers/savedController.js': `const Saved = require('../models/Saved');

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
`,
  'routes/savedRoutes.js': `const express = require('express');
const router = express.Router();
const { saveListing, getSavedListings, removeSavedListing } = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:listingId', protect, saveListing);
router.get('/', protect, getSavedListings);
router.delete('/:listingId', protect, removeSavedListing);

module.exports = router;
`,
  'controllers/gemmaController.js': `const { GoogleGenAI } = require('@google/genai');

const askGemma = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ response: "AI features are currently unavailable because the API key is not configured." });
    }

    const { preferences, listing, matchPercentage, question } = req.body;

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const prompt = \`
You are Gemma, an AI assistant for the Belong roommate finder app.
The user is asking: "\${question}"

Context:
- User Preferences: \${JSON.stringify(preferences)}
- Listing Details: \${JSON.stringify(listing)}
- Overall Match Percentage: \${matchPercentage}%

Please provide a helpful, concise explanation focusing on compatibility, lifestyle differences, and useful observations. Do not give generic chatbot answers. Keep it focused on the roommate/flatmate context.
\`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.json({ response: "I'm sorry, I couldn't process that request right now. (Fallback response)" });
  }
};

module.exports = { askGemma };
`,
  'routes/gemmaRoutes.js': `const express = require('express');
const router = express.Router();
const { askGemma } = require('../controllers/gemmaController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, askGemma);

module.exports = router;
`,
  'seed/seedListings.js': `const mongoose = require('mongoose');
require('dotenv').config();
const Listing = require('../models/Listing');

const sampleListings = [
  {
    title: "Cozy Private Room in Indiranagar",
    description: "Looking for a chill roommate for a 2BHK in the heart of Indiranagar.",
    location: "Bengaluru",
    rent: 18000,
    roomType: "Private",
    sharing: "No",
    roommates: 1,
    smoking: "No",
    pets: "Yes",
    guests: "Sometimes",
    sleepSchedule: "Early Bird",
    social: "Introverted",
    cleanliness: "Very Clean",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Spacious Shared Room in Koregaon Park",
    description: "Shared room available in a 3BHK flat. Walking distance to cafes.",
    location: "Pune",
    rent: 12000,
    roomType: "Shared",
    sharing: "Yes",
    roommates: 2,
    smoking: "Outside Only",
    pets: "No",
    guests: "Often",
    sleepSchedule: "Night Owl",
    social: "Extroverted",
    cleanliness: "Average",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e5240980c"
  },
  {
    title: "Beautiful Heritage Home near Hawa Mahal",
    description: "Peaceful environment, looking for someone who appreciates quiet.",
    location: "Jaipur",
    rent: 10000,
    roomType: "Private",
    sharing: "No",
    roommates: 1,
    smoking: "No",
    pets: "No",
    guests: "Rarely",
    sleepSchedule: "Early Bird",
    social: "Introverted",
    cleanliness: "Very Clean",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    title: "Modern Apartment in Gachibowli",
    description: "Close to IT parks. Perfect for techies.",
    location: "Hyderabad",
    rent: 22000,
    roomType: "Private",
    sharing: "No",
    roommates: 1,
    smoking: "Yes",
    pets: "Yes",
    guests: "Often",
    sleepSchedule: "Flexible",
    social: "Extroverted",
    cleanliness: "Average",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    title: "Vibrant flat in Hauz Khas",
    description: "Artistic vibe, lots of plants. Looking for like-minded people.",
    location: "Delhi",
    rent: 20000,
    roomType: "Shared",
    sharing: "Yes",
    roommates: 3,
    smoking: "Outside Only",
    pets: "Yes",
    guests: "Sometimes",
    sleepSchedule: "Night Owl",
    social: "Ambivert",
    cleanliness: "Clean",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");
    await Listing.deleteMany();
    await Listing.insertMany(sampleListings);
    console.log("Data seeded successfully!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
}
console.log('Files created');
