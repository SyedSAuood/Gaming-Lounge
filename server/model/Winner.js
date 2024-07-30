const mongoose = require('mongoose');

// Define the winner schema
const winnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gamename: {
    type: String,
    required: true
  }
});

// Create a Winner model
const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;