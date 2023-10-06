const mongoose = require('mongoose');
const Note = require('../models/noteModel');

const createNote = async (req, res) => {
  try {
    const audioBlob = req.body.audioBlob;
    const audioData = audioBlob.toString('base64');

    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      audioData: audioData,
      user: req.userId,
    });

    const savedNote = await note.save();
    if (savedNote) {
      res.status(200).send({
        message: "Note saved successfully",
        result: savedNote,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Note creation unsuccessful",
      error: error.message,
    });
  }
};

// Get All Notes
const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId to get the user's ID
    const notes = await Note.find({ user: userId }); // Query notes for the specific user
    res.status(200).send({
      message: "Notes found successfully",
      notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Notes retrieving unsuccessful",
      error: error.message,
    });
  }
};

// Get Single Note
const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send({
        message: "Note not found",
      });
    } else {
      res.status(200).send({
        message: "Note found successfully",
        note,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Single note retrieving unsuccessful",
      error: error.message,
    });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send({
        message: "Note not found",
      });
    } else {
      note.title = req.body.title;
      note.content = req.body.content;

      const updatedNote = await note.save();

      res.status(200).send({
        message: "Note updated successfully",
        updatedNote,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Note updating unsuccessful",
      error: error.message,
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send({
        message: "Note not found",
      });
    } else {
      await Note.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "Note deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Note deletion unsuccessful",
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
