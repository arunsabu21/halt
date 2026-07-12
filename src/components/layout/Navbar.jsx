import HaltLogo from "../common/HaltLogo";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.logoLink}>
        <HaltLogo size="sm" />
      </a>

      <div className={styles.links}>
        <a href="/" className={styles.link}>
          Home
        </a>
        <a href="/trips" className={styles.link}>
          Trips
        </a>
        <a href="/my-bookings" className={styles.link}>
          My Bookings
        </a>
      </div>

      <div className={styles.actions}>
        <a href="/login" className={styles.loginBtn}>
          Login
        </a>
        <a href="/register" className={styles.registerBtn}>
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;