const express = require('express');
const router = express.Router();
const { createPreferences, getPreferences, updatePreferences } = require('../controllers/preferenceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPreferences);
router.get('/', protect, getPreferences);
router.put('/', protect, updatePreferences);

module.exports = router;
