const mongoose = require('mongoose');
const User = require('./userModel'); 
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
