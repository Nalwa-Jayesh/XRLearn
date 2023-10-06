const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote
} = require('../controllers/notesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createNote)
router.get('/notes', authMiddleware, getAllNotes);
router.get('/single/:id', authMiddleware, getSingleNote); 
router.put('/update/:id', authMiddleware, updateNote);
router.delete('/delete/:id', authMiddleware, deleteNote);

module.exports = router;
