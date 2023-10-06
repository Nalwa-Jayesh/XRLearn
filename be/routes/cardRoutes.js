const express = require('express');
const router = express.Router();
const {
  createCard, deleteCard, getAllCards
} = require('../controllers/cardsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new card
router.post('/create', authMiddleware, createCard);

// Delete a card by ID
router.delete('/delete/:id', authMiddleware, deleteCard);

// Get all cards created by the user
router.get('/all', authMiddleware, getAllCards);
module.exports = router;
