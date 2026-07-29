import "./TripSummaryBar.css";

function TripSummaryBar({ selectedSeats, farePerSeat, onContinue, isLoading, error }) {
  const total = selectedSeats.length * Number(farePerSeat);

  return (
    <div className="trip-summary-bar">
      <div className="trip-summary-info">
        <span className="trip-summary-count">
          {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"}{" "}
          selected
        </span>
        {selectedSeats.length > 0 && (
          <span className="trip-summary-seats">{selectedSeats.join(", ")}</span>
        )}
        {error && <span className="trip-summary-error">{error}</span>}
      </div>

      <div className="trip-summary-total">
        <span className="trip-summary-amount">₹{total.toFixed(2)}</span>
        <span className="trip-summary-label">Total</span>
      </div>

      <button
        type="button"
        className="trip-summary-button"
        disabled={selectedSeats.length === 0 || isLoading}
        onClick={onContinue}
      >
        {isLoading ? "Redirecting..." : "Select boarding & dropping points"}
      </button>
    </div>
  );
}

export default TripSummaryBar;
