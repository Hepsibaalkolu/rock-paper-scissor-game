const Score = require("../models/Score");

// Get all scores
const getScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create new score
const createScore = async (req, res) => {
  const { username, score } = req.body;

  try {
    const newScore = new Score({ username, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ error: "Failed to create score" });
  }
};

module.exports = {
  getScores,
  createScore,
};


// import Score from "../models/Score.js";

// // Get all scores
// export const getScores = async (req, res) => {
//   try {
//     const scores = await Score.find().sort({ score: -1 }).limit(10);
//     res.json(scores);
//   } catch (err) {
//     console.error("Error fetching scores:", err);
//     res.status(500).json({ error: "Failed to fetch scores" });
//   }
// };

// // Create a new score
// export const createScore = async (req, res) => {
//   const { username, score } = req.body;

//   if (!username || score === undefined) {
//     return res.status(400).json({ error: "Username and score are required" });
//   }

//   try {
//     const newScore = new Score({ username, score });
//     await newScore.save();
//     res.status(201).json(newScore);
//   } catch (err) {
//     console.error("Error creating score:", err);
//     res.status(500).json({ error: "Failed to create score" });
//   }
// };



