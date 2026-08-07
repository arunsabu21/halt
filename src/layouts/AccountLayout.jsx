import { Outlet, NavLink } from "react-router-dom";
import { Ticket, User } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "./AccountLayout.css";

const NAV_ITEMS = [
  { to: "/account/bookings", label: "My Bookings", icon: Ticket },

  // TODO: Create the page for profile
  { to: "/account/profile", label: "Profile", icon: User },
];

function AccountLayout() {
  return (
    <>
      <Navbar />
      <div className="account-layout">
        <aside className="account-sidebar">
          <nav className="account-sidebar-nav">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `account-sidebar-link${isActive ? " account-sidebar-link-active" : ""}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="account-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default AccountLayout;
