const express = require('express');
const router = express.Router();
const { saveListing, getSavedListings, removeSavedListing } = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:listingId', protect, saveListing);
router.get('/', protect, getSavedListings);
router.delete('/:listingId', protect, removeSavedListing);

module.exports = router;
