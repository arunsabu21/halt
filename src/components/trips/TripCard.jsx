import { MapPin, Clock, Users } from "lucide-react";
import { formatTime } from "../../utils/formatTime";
import { calculateDuration } from "../../utils/calculateDuration";

import "./TripCard.css";

function TripCard({ trip, onSelect }) {
  const {
    operator,
    bus,
    route,
    departure_time,
    arrival_time,
    fare,
    available_seats,
  } = trip;

  const duration = calculateDuration(departure_time, arrival_time);
  const isLowSeats = available_seats > 0 && available_seats <= 8;
  const isSoldOut = available_seats === 0;

  return (
    <div className="trip-card">
      <div className="trip-card-main">
        <div className="trip-card-operator">
          <span className="trip-card-operator-name">{operator}</span>
          <span className="trip-card-bus-name">{bus}</span>
        </div>

        <div className="trip-card-timing">
          <div className="trip-card-time-block">
            <span className="trip-card-time">{formatTime(departure_time)}</span>
            <span className="trip-card-time-label">Departure</span>
          </div>

          <div className="trip-card-duration">
            <span className="trip-card-duration-line" aria-hidden="true" />
            <span className="trip-card-duration-text">
              <Clock size={12} />
              {duration}
            </span>
            <span className="trip-card-duration-line" aria-hidden="true" />
          </div>

          <div className="trip-card-time-block">
            <span className="trip-card-time">{formatTime(arrival_time)}</span>
            <span className="trip-card-time-label">Arrival</span>
          </div>
        </div>

        <div className="trip-card-route">
          <MapPin size={14} />
          {route}
        </div>
      </div>

      <div className="trip-card-aside">
        <div className="trip-card-fare">
          <span className="trip-card-fare-amount">₹{fare}</span>
          <span className="trip-card-fare-label">per seat</span>
        </div>

        <div
          className={`trip-card-seats${isLowSeats ? " trip-card-seats-low" : ""}`}
        >
          <Users size={14} />
          {isSoldOut ? "Sold out" : `${available_seats} seats left`}
        </div>

        <button
          type="button"
          className="trip-card-button"
          onClick={() => onSelect(trip)}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Unavailable" : "Select Seats"}
        </button>
      </div>
    </div>
  );
}

export default TripCard;
