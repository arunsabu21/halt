import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HaltLogo from "../common/HaltLogo";
import { CircleUser, Menu, X, ChevronDown, LogOut, Ticket } from "lucide-react";
import { logoutUser } from "../../services/auth";
import { useToast } from "../../hooks/useToast";
import "../layout/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // TODO: Replace localStorage auth check with TanStack Query (currentUser)
  // After implementing the user profile (/whoami) endpoint
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      if (refreshToken) await logoutUser(refreshToken);
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsDropdownOpen(false);
    closeMenu();
    showToast("success", "Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logoLink" onClick={closeMenu}>
          <HaltLogo size="sm" />
        </Link>

        <div className="links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="#" className="link">
            About
          </Link>
          <Link to="#" className="link">
            Help
          </Link>
          <Link to="#" className="link">
            Trips
          </Link>
          <Link to="#" className="link">
            My Bookings
          </Link>
        </div>

        <div className="actions">
          {isLoggedIn ? (
            <div className="userMenu" ref={dropdownRef}>
              <button
                className="userMenuTrigger"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <CircleUser size={20} />
                <ChevronDown
                  size={16}
                  className={isDropdownOpen ? "chevronOpen" : ""}
                />
              </button>

              {isDropdownOpen && (
                <div className="userDropdown">
                  <Link
                    to="#"
                    className="userDropdownItem"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Ticket size={16} />
                    <span>My Bookings</span>
                  </Link>
                  <button
                    className="userDropdownItem userDropdownLogout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="loginBtn">
                <CircleUser size={20} />
                <span>Login</span>
              </Link>
              <Link to="/auth/register" className="registerBtn">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="navToggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobilePanel ${isMenuOpen ? "mobilePanelOpen" : ""}`}>
        <Link to="/" className="mobileLink" onClick={closeMenu}>
          Home
        </Link>
        <Link to="#" className="mobileLink" onClick={closeMenu}>
          Trips
        </Link>
        <Link to="#" className="mobileLink" onClick={closeMenu}>
          My Bookings
        </Link>
        <div className="mobileDivider" />

        {isLoggedIn ? (
          <button className="mobileLogoutBtn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link to="/auth/login" className="mobileLoginBtn" onClick={closeMenu}>
              Login
            </Link>
            <Link
              to="/auth/register"
              className="mobileRegisterBtn"
              onClick={closeMenu}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
