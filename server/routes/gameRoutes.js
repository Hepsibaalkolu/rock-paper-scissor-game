import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

// GET /api/scores - Fetch the highest score
router.get("/", async (req, res) => {
  try {
    const highestScore = await Score.find().sort({ score: -1 }).limit(1);
    
    if (highestScore.length > 0) {
      res.json(highestScore[0]);
    } else {
      res.json({ message: "No scores available", score: null });
    }
  } catch (err) {
    console.error("Error fetching highest score:", err);
    res.status(500).json({ error: "Failed to fetch highest score" });
  }
});


// POST /api/scores - Save a new score
router.post("/", async (req, res) => {
    const { username, score } = req.body;
  
    console.log("Received score:", { username, score });
  
    try {
      // Save new score
      const newScore = new Score({ username, score });
      await newScore.save();
      
      console.log("New score saved:", newScore);
      res.status(201).json(newScore);
    } catch (err) {
      console.error("Error saving score:", err);
      res.status(500).json({ error: "Failed to save score" });
    }
  });
  

export default router;


