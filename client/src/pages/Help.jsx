import "./Help.css";

const Help = () => {
  return (
    <div className="help" >
      <h2>How to Play</h2>
      <div className="instructions">
        <p>
          <strong>1. Choose Rock, Paper, or Scissors.</strong>
        </p>
        <p>
          <strong>2. The computer will also make a choice.</strong>
        </p>
        <p>
          <strong>3. Rock beats Scissors, Scissors beats Paper, and Paper beats Rock.</strong>
        </p>
        <p>
          <strong>4. Win to increase your score, lose to decrease it.</strong>
        </p>
      </div>
    </div>
  );
};

export default Help;
