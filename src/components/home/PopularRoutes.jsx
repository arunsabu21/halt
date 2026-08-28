import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { searchTrips } from "../../services/trips";
import { calculateDuration } from "../../utils/calculateDuration";
import "./PopularRoutes.css";

const FEATURED_ROUTES = [
  { source: "Chennai", destination: "Bengaluru" },
  { source: "Bengaluru", destination: "Hyderabad" },
  { source: "Chennai", destination: "Coimbatore" },
  { source: "Kochi", destination: "Bengaluru" },
  { source: "Chennai", destination: "Madurai" },
];

const getFeaturedDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7); 
  return date.toISOString().split("T")[0];
};

function PopularRoutes({ onLoadingChange }) {
  const navigate = useNavigate();
  const travelDate = getFeaturedDate();

  const results = useQueries({
    queries: FEATURED_ROUTES.map((route) => ({
      queryKey: ["popular-route", route.source, route.destination, travelDate],
      queryFn: () =>
        searchTrips({
          source: route.source,
          destination: route.destination,
          travel_date: travelDate,
        }),
      staleTime: 1000 * 60 * 60, 
    })),
  });

  const isLoading = results.some((result) => result.isPending);

  useEffect(() =>{
    onLoadingChange(isLoading);
  }, [isLoading, onLoadingChange]);

  const cards = results
    .map((result, index) => {
      const trip = result.data?.[0];
      if (!trip) return null;

      return {
        from: FEATURED_ROUTES[index].source,
        to: FEATURED_ROUTES[index].destination,
        travelDate,
        price: trip.fare,
        duration: calculateDuration(trip.departure_time, trip.arrival_time),
      };
    })
    .filter(Boolean);

  const handleClick = (route) => {
    const params = new URLSearchParams({
      source: route.from,
      destination: route.to,
      travel_date: route.travelDate,
    });
    navigate(`/search?${params.toString()}`);
  };

  if (cards.length === 0) return null;

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
        {cards.map((route) => (
          <button
            key={`${route.from}-${route.to}`}
            className="route-card"
            type="button"
            onClick={() => handleClick(route)}
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
