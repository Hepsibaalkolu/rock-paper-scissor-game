import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Rock Paper Scissors Game!</h2>
      <Link to="/game" className="play-btn">Start Playing</Link>
    </div>
  );
};

export default Home;
