// import React, { useState } from 'react';
// // import './Game.css';

// const Game = () => {
//   const [userChoice, setUserChoice] = useState('');
//   const [computerChoice, setComputerChoice] = useState('');
//   const [result, setResult] = useState('');

//   const choices = ['rock', 'paper', 'scissors'];

//   const handleUserChoice = (choice) => {
//     setUserChoice(choice);
//     const randomChoice = choices[Math.floor(Math.random() * choices.length)];
//     setComputerChoice(randomChoice);
//     determineWinner(choice, randomChoice);
//   };

//   const determineWinner = (user, computer) => {
//     if (user === computer) {
//       setResult("It's a draw!");
//     } else if (
//       (user === 'rock' && computer === 'scissors') ||
//       (user === 'scissors' && computer === 'paper') ||
//       (user === 'paper' && computer === 'rock')
//     ) {
//       setResult('You Win!');
//     } else {
//       setResult('You Lose!');
//     }
//   };

//   return (
//     <div className="game-container">
//       <h2>Choose Your Move:</h2>
//       <div className="choices">
//         {choices.map((choice) => (
//           <button key={choice} className="btn btn-primary m-2" onClick={() => handleUserChoice(choice)}>
//             {choice.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       <div className="result mt-4">
//         <h3>Your Choice: {userChoice}</h3>
//         <h3>Computer's Choice: {computerChoice}</h3>
//         <h2>{result}</h2>
//       </div>
//     </div>
//   );
// };

// export default Game;



import { useState, useRef } from "react";
import { Howl } from "howler";
import gsap from "gsap";
import { saveScore } from "../api";
import clickSound from "../assets/sounds/click.mp3";
import winSound from "../assets/sounds/win.wav";
import loseSound from "../assets/sounds/lose.wav";
import drawSound from "../assets/sounds/draw.mp3";
import rockImage from "../assets/images/rock.png";
import paperImage from "../assets/images/paper.png";
import scissorsImage from "../assets/images/scissors.png";
import "./Game.css";

const choices = [
  { name: "Rock", img: rockImage },
  { name: "Paper", img: paperImage },
  { name: "Scissors", img: scissorsImage },
];

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineWinner = (player, computer) => {
  if (player === computer) return "Draw";
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "Win";
  }
  return "Lose";
};

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const resultRef = useRef(null);

  const handleChoice = async (choice) => {
    setPlayerChoice(choice);
    const computer = getComputerChoice();
    setComputerChoice(computer);
    const gameResult = determineWinner(choice, computer.name);
    setResult(gameResult);

    let newScore = score;

    if (gameResult === "Win") {
      newScore += 1;
      setScore(newScore);
    } else if (gameResult === "Lose") {
      newScore -= 1;
      setScore(newScore);
    }

    // Save score after each game
    if (gameResult !== "Draw") {
      await saveScore("Hema", newScore); // Adjust username as needed
    }
  };

  return (
    <div className="game-container">
      <h2>Score: {score}</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice.name} onClick={() => handleChoice(choice.name)}>
            {choice.name}
          </button>
        ))}
      </div>
      <div ref={resultRef}>{result}</div>
    </div>
  );
};

export default Game;
