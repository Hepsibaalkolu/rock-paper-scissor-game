import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>RPS Game</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/game">Play</Link>
        <Link to="/scoreboard">Scoreboard</Link>
        <Link to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
