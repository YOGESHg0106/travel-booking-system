import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>Travel Booking</h1>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Book Now
        </Link>
        <Link to="/bookings" onClick={() => setMenuOpen(false)}>
          View Bookings
        </Link>
        <button className="login-btn" onClick={() => setMenuOpen(false)}>
          Login
        </button>
      </div>
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
