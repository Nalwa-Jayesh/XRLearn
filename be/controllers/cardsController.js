const Card = require("../models/cardModel");

// Create a new card
const createCard = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const user = req.userId; // Assuming you have user authentication middleware

    const card = new Card({
      name,
      imageUrl,
      user,
    });

    const savedCard = await card.save();

    res.status(201).json({
      message: "Card created successfully",
      result: savedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Card creation unsuccessful",
      error: error.message,
    });
  }
};

// Delete a card by ID
const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.userId; // Assuming you have user authentication middleware

    const deletedCard = await Card.findOneAndDelete({
      _id: cardId,
      user: user,
    });

    if (!deletedCard) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    res.status(200).json({
      message: "Card deleted successfully",
      result: deletedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Card deletion unsuccessful",
      error: error.message,
    });
  }
};

// Get all cards created by the user
const getAllCards = async (req, res) => {
  try {
    const user = req.userId; // Assuming you have user authentication middleware

    const cards = await Card.find({ user });

    res.status(200).json({
      message: "Cards retrieved successfully",
      result: cards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching cards",
      error: error.message,
    });
  }
};

module.exports = {
  createCard,
  deleteCard,
  getAllCards, // Add getAllCards to export
};
