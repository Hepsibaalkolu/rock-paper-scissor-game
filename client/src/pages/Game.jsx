import { useState, useRef } from "react";
import { Howl } from "howler";
import gsap from "gsap";
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
  const playerHandRef = useRef(null);
  const computerHandRef = useRef(null);

  const playSound = (sound) => {
    const soundObj = new Howl({ src: [sound] });
    soundObj.play();
  };

  const handleChoice = (choice) => {
    playSound(clickSound);
    setPlayerChoice(choice);

    gsap.fromTo(
      playerHandRef.current,
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    const computer = getComputerChoice();
    setComputerChoice(computer);

    gsap.fromTo(
      computerHandRef.current,
      { x: 150, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    const gameResult = determineWinner(choice, computer.name);
    setResult(gameResult);

    if (gameResult === "Win") {
      playSound(winSound);
      setScore(score + 1);
    } else if (gameResult === "Lose") {
      playSound(loseSound);
      setScore(score - 1);
    } else {
      playSound(drawSound);
    }

    gsap.fromTo(
      resultRef.current,
      { scale: 0 },
      { scale: 1.3, duration: 0.4, ease: "elastic.out(1, 0.5)" }
    );

    gsap.fromTo(
      resultRef.current,
      { y: -20 },
      { y: 0, duration: 0.5, ease: "bounce.out" }
    );
  };

  return (
    <div className="game-container" style={{ backgroundColor: "#F5F5F5", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="game-content" style={{ padding: "50px", borderRadius: "20px", backgroundColor: "#FAF3E0", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", width: "700px", textAlign: "center" }}>
        <div className="scoreboard" style={{ marginBottom: "20px", fontSize: "1.8rem", color: "#333" }}>
          <h5>Score: {score}</h5>
        </div>

        <div className="hands" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div ref={playerHandRef} className="hand player-hand">
            {playerChoice && (
              <img src={choices.find(c => c.name === playerChoice).img} alt="Player" style={{ width: "160px" }} />
            )}
          </div>

          <div ref={computerHandRef} className="hand computer-hand">
            {computerChoice && (
              <img src={choices.find(c => c.name === computerChoice.name).img} alt="Computer" style={{ width: "160px", transform: "scaleX(-1)" }} />
            )}
          </div>
        </div>

        <div className="choices" style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
          {choices.map((choice) => (
            <button key={choice.name} onClick={() => handleChoice(choice.name)} className="choice-button" style={{ padding: "15px", backgroundColor: "#FFD700", borderRadius: "15px", width: "150px", height: "150px" }}>
              <img src={choice.img} alt={choice.name} style={{ width: "100px", height: "100px" }} />
              <p>{choice.name}</p>
            </button>
          ))}
        </div>

        <div className="result" ref={resultRef} style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333" }}>
          {result && <h2>{result}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Game;
