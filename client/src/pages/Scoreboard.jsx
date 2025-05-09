


import React, { useEffect, useState } from "react";
import { getScores } from "../api";
import gsap from "gsap";
import "./Scoreboard.css"; 


const Scoreboard = () => {
  const [highestScore, setHighestScore] = useState(null);

  useEffect(() => {
    const fetchHighestScore = async () => {
      try {
        const scoreData = await getScores();
        console.log("Fetched highest score:", scoreData);

        if (scoreData && scoreData.score !== undefined) {
          setHighestScore(scoreData);
        } else {
          setHighestScore(null);
        }

        gsap.from(".highest-score", {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: "power3.out",
        });
      } catch (error) {
        console.error("Error fetching highest score:", error);
      }
    };

    fetchHighestScore();
  }, []);


  return (
    <div className="scoreboard-container">
      <h2>Highest Score</h2>

      {highestScore ? (
        <div className="highest-score">
          <h3>{highestScore.username}</h3>
          <p>Score: {highestScore.score}</p>
        </div>
      ) : (
        <p>No score available</p>
      )}
    </div>
  );
};

export default Scoreboard;


