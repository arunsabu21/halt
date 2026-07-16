import { Link } from "react-router-dom";
import HaltLogo from "../common/HaltLogo";
import "../layout/Navbar.css";

function AuthNav() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logoLink">
          <HaltLogo size="sm" />
        </Link>
      </div>
    </nav>
  );
}

export default AuthNav;
