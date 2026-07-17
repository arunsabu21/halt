import { ArrowRight } from "lucide-react";
import "./PopularRoutes.css";

const routes = [
  { from: "Kochi", to: "Bangalore", price: 899, duration: "9h 30m" },
  { from: "Thiruvananthapuram", to: "Chennai", price: 1199, duration: "12h" },
  { from: "Kozhikode", to: "Coimbatore", price: 449, duration: "5h" },
  { from: "Ernakulam", to: "Hyderabad", price: 1499, duration: "16h" },
  { from: "Kannur", to: "Mysuru", price: 799, duration: "8h" },
  { from: "Kollam", to: "Madurai", price: 649, duration: "7h" },
];

function PopularRoutes() {
  return (
    <section className="popular-routes">
      <div className="popular-routes-header">
        <span className="section-eyebrow">Trending this week</span>
        <h2 className="section-title">Popular Routes</h2>
        <p className="section-subtitle">
          Frequently booked routes with the best fares right now.
        </p>
      </div>

      <div className="routes-grid">
        {routes.map((route) => (
          <button
            key={`${route.from}-${route.to}`}
            className="route-card"
            type="button"
          >
            <div className="route-cities">
              <span className="route-city">{route.from}</span>
              <div className="route-path" aria-hidden="true">
                <span className="route-dot" />
                <span className="route-dash" />
                <ArrowRight size={14} className="route-arrow" />
              </div>
              <span className="route-city">{route.to}</span>
            </div>

            <div className="route-meta">
              <span className="route-duration">{route.duration}</span>
              <span className="route-price">
                <span className="route-price-label">from</span> ₹{route.price}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularRoutes;