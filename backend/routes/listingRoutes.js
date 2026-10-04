const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing, calculateMatch } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getListings);
router.post('/', createListing); // Open for MVP, or could protect
router.get('/:id', getListingById);
router.get('/:listingId/match', protect, calculateMatch); 

module.exports = router;
