import HaltLogo from "../common/HaltLogo";
import "./Footer.css";

const footerLinks = {
  Company: ["About", "Careers", "Blog"],
  Support: ["Help Center", "Contact Us", "Cancellation"],
  Legal: ["Terms", "Privacy Policy", "Refund Policy"],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <HaltLogo size="sm" />
          <p className="footer-tagline">
            Travel smarter, book faster, across India.
          </p>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div className="footer-column" key={section}>
            <h4 className="footer-heading">{section}</h4>
            <ul className="footer-list">
              {links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Halt. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;