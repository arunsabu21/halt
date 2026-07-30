import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTripDetails } from "../services/trips";
import { getRouteStops } from "../services/routes";
import { buildStopSequence } from "../utils/buildStopSequence";
import { getBookingDraft, updateBookingDraft } from "../utils/bookingDraft";
import { useToast } from "../hooks/useToast";
import PageLoader from "../components/common/PageLoader";

import "../styles/BoardingPointSelect.css";

function BoardingPointSelect() {
  const { tripId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [boardingPoint, setBoardingPoint] = useState("");
  const [dropPoint, setDropPoint] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const draft = getBookingDraft();
    if (!draft || draft.tripId != tripId || !draft.selectedSeats?.length) {
      navigate(`/trips/${tripId}/seats/`, { replace: true });
    }
  }, [tripId, navigate]);

  const { data: trip, isLoading: isTripLoading } = useQuery({
    queryKey: ["trip-details", tripId],
    queryFn: () => getTripDetails(tripId),
  });

  const { data: routeStopsData, isLoading: isStopsLoading } = useQuery({
    queryKey: ["route-stops", trip?.trip_id],
    queryFn: () => getRouteStops(trip.route_id),
    enabled: Boolean(trip?.route_id),
  });

  if (isTripLoading || isStopsLoading) return <PageLoader />;

  const stopSequence =
    trip && routeStopsData ? buildStopSequence(routeStopsData, trip) : [];

  const boardingIndex = stopSequence.findIndex((s) => s.city === boardingPoint);
  const dropOptions =
    boardingIndex >= 0
      ? stopSequence.slice(boardingIndex + 1)
      : stopSequence.slice(1);

  const handleBoardingChange = (value) => {
    setBoardingPoint(value);
    setDropPoint("");
    setError(null);
  };

  const handleContinue = () => {
    if (!boardingPoint || !dropPoint) {
      showToast("Please select both boarding and drop points.");
      return;
    }

    updateBookingDraft({ boardingPoint, dropPoint });
    navigate(`/trips/${tripId}/passengers`);
  };

  return (
    <div className="boarding-select">
      <h1 className="boarding-select-title">Select Boarding & Drop Points</h1>
      <p className="boarding-select-subtitle">{trip.route}</p>

      <div className="boarding-select-form">
        <div className="boarding-field">
          <label htmlFor="boarding-point">Boarding Point</label>
          <select
            id="boarding-point"
            value={boardingPoint}
            onChange={(e) => handleBoardingChange(e.target.value)}
          >
            <option value="">Select boarding point</option>
            {stopSequence.slice(0, -1).map((stop) => (
              <option key={stop.id} value={stop.city}>
                {stop.city}
                {stop.time ? ` — ${stop.time}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="boarding-field">
          <label htmlFor="drop-point">Drop Point</label>
          <select
            id="drop-point"
            value={dropPoint}
            onChange={(e) => {
              setDropPoint(e.target.value);
              setError(null);
            }}
            disabled={!boardingPoint}
          >
            <option value="">Select drop point</option>
            {dropOptions.map((stop) => (
              <option key={stop.id} value={stop.city}>
                {stop.city}
                {stop.time ? ` — ${stop.time}` : ""}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="boarding-select-error">{error}</p>}

        <button
          type="button"
          className="boarding-select-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default BoardingPointSelect;
