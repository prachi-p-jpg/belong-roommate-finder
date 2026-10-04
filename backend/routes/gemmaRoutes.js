const express = require('express');
const router = express.Router();
const { askGemma, testGemma } = require('../controllers/gemmaController');
const { protect } = require('../middleware/authMiddleware');

router.get('/test', testGemma);
router.post('/chat', protect, askGemma);

module.exports = router;
