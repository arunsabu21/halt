import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../assets/not-found.svg";
import { getTripDetails, getTripSeats } from "../services/trips";
import { getRouteStops } from "../services/routes";
import getErrorMessage from "../utils/getErrorMessage";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";
import { calculateDuration } from "../utils/calculateDuration";
import { buildStopSequence } from "../utils/buildStopSequence";
import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";
import SeatMap from "../components/trips/SeatMap";
import BoardingPoints from "../components/trips/BoardingPoints";
import BusAmenities from "../components/trips/BusAmenities";
import CancellationPolicy from "../components/trips/CancellationPolicy";
import TripSummaryBar from "../components/trips/TripSummaryBar";

import "../styles/TripDetails.css";

function TripDetails() {
  const { tripId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const {
    data: trip,
    isLoading: isTripLoading,
    isError: isTripError,
    error: tripError,
  } = useQuery({
    queryKey: ["trip-details", tripId],
    queryFn: () => getTripDetails(tripId),
  });

  const { data: seatData, isLoading: isSeatsLoading } = useQuery({
    queryKey: ["tripSeats", tripId],
    queryFn: () => getTripSeats(tripId),
  });

  const {
    data: routeStopsData,
    isLoading: isStopsLoading,
    isError: isStopsError,
  } = useQuery({
    queryKey: ["route-stops", trip?.route_id],
    queryFn: () => getRouteStops(trip.route_id),
    enabled: Boolean(trip?.route_id),
  });

  const handleToggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  const handleContinue = () => {
    // TODO: Connect
    console.log("Continue with seats:", selectedSeats);
  };

  if (isTripLoading) return <PageLoader />;

  if (isTripError) {
    return (
      <EmptyState
        image={NotFound}
        imageAlt="Something went wrong"
        title="Something went wrong"
        message={getErrorMessage(tripError)}
      />
    );
  }

  const duration = calculateDuration(trip.departure_time, trip.arrival_time);
  const stopSequence = routeStopsData
    ? buildStopSequence(routeStopsData, trip)
    : [];

  return (
    <div className="trip-details">
      <div className="trip-details-header">
        <div>
          <h1 className="trip-details-route">{trip.route}</h1>
          <p className="trip-details-date">{formatDate(trip.travel_date)}</p>
        </div>

        <div className="trip-details-timing">
          <div className="trip-details-time-block">
            <span className="trip-details-time">
              {formatTime(trip.departure_time)}
            </span>
            <span className="trip-details-time-label">Departure</span>
          </div>
          <span className="trip-details-duration">{duration}</span>
          <div className="trip-details-time-block">
            <span className="trip-details-time">
              {formatTime(trip.arrival_time)}
            </span>
            <span className="trip-details-time-label">Arrival</span>
          </div>
        </div>

        <div className="trip-details-operator">
          <span className="trip-details-operator-name">
            {trip.bus.operator}
          </span>
          <span className="trip-details-bus-name">{trip.bus.bus_name}</span>
        </div>
      </div>

      <div className="trip-details-body">
        <div className="trip-details-main">
          <div className="detail-panel">
            <h3 className="detail-panel-title">Select Your Seats</h3>
            {isSeatsLoading ? (
              <p className="detail-panel-empty">Loading seat map...</p>
            ) : (
              <SeatMap
                seats={seatData.seats}
                seatLayout={seatData.seat_layout}
                deckCount={seatData.deck_count}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
              />
            )}
          </div>

          {isStopsLoading ? (
            <div className="detail-panel">
              <p className="detail-panel-empty">Loading route details...</p>
            </div>
          ) : isStopsError ? (
            <div className="detail-panel">
              <p className="detail-panel-empty">Couldn't load route details.</p>
            </div>
          ) : (
            <BoardingPoints stops={stopSequence} />
          )}
        </div>

        <div className="trip-details-aside">
          <BusAmenities
            amenities={trip.bus.amenities}
            busType={trip.bus.bus_type}
          />
          <CancellationPolicy />
        </div>
      </div>

      <TripSummaryBar
        selectedSeats={selectedSeats}
        farePerSeat={trip.fare}
        onContinue={handleContinue}
      />
    </div>
  );
}

export default TripDetails;
