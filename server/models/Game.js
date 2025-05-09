const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userChoice: {
    type: String,
    required: true,
    enum: ['rock', 'paper', 'scissors']
  },
  computerChoice: {
    type: String,
    required: true,
    enum: ['rock', 'paper', 'scissors']
  },
  result: {
    type: String,
    required: true,
    enum: ['Win', 'Lose', 'Draw']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);