import { Link } from "react-router-dom";
import HaltLogo from "../common/HaltLogo";
import { CircleUser } from "lucide-react";
import "../layout/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logoLink">
        <HaltLogo size="sm" />
      </Link>

      <div className="links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/trips" className="link">
          Trips
        </Link>
        <Link to="/my-bookings" className="link">
          My Bookings
        </Link>
      </div>

      <div className="actions">
        <Link to="/auth/login" className="loginBtn">
          <CircleUser size={20} />
          <span>Login</span>
        </Link>
        <Link to="/auth/register" className="registerBtn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
