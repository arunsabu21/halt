import { Link } from "react-router-dom";
import HaltLogo from "../common/HaltLogo";
import "../layout/Navbar.css";

function AuthNav() {
  return (
    <nav className="navbar">
      <Link to="/" className="logoLink">
        <HaltLogo size="sm" />
      </Link>
    </nav>
  );
}

export default AuthNav;
