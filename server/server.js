
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import gameRoutes from "./routes/gameRoutes.js";


// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/scores", gameRoutes);


// // GET /api/scores/highest - Get the highest score
// app.get("/api/scores/highest", async (req, res) => {
//     try {
//       const highestScore = await Score.findOne().sort({ score: -1 }).limit(1);
//       if (highestScore) {
//         console.log("Highest score fetched:", highestScore);
//         return res.json(highestScore);
//       } else {
//         return res.status(404).json({ error: "No scores found" });
//       }
//     } catch (err) {
//       console.error("Error fetching highest score:", err);
//       res.status(500).json({ error: "Failed to fetch highest score" });
//     }
//   });
  



  
// // Database connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/rock-paper-scissors")
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log("Database connection error:", err));


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Debug logs to confirm environment variables
console.log("PORT:", PORT);
console.log("MONGO_URI:", MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/scores", gameRoutes);

// GET /api/scores/highest - Get the highest score
app.get("/api/scores/highest", async (req, res) => {
  try {
    const highestScore = await Score.findOne().sort({ score: -1 }).limit(1);
    if (highestScore) {
      return res.json(highestScore);
    } else {
      return res.status(404).json({ error: "No scores found" });
    }
  } catch (err) {
    console.error("Error fetching highest score:", err);
    res.status(500).json({ error: "Failed to fetch highest score" });
  }
});

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
