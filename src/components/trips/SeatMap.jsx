import "./SeatMap.css";

function SteeringWheelIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v5M12 16v5M3.5 8.5l4.3 2.5M20.5 8.5l-4.3 2.5M3.5 15.5l4.3-2.5M20.5 15.5l-4.3-2.5" />
    </svg>
  );
}

function parseLayout(seatLayout) {
  const [left, right] = seatLayout.split("+").map(Number);
  if (!left || !right) return { left: 2, right: 2 };
  return { left, right };
}

function groupIntoRows(seats, seatLayout) {
  const { left, right } = parseLayout(seatLayout);
  const perRow = left + right;

  const rows = [];
  for (let i = 0; i < seats.length; i += perRow) {
    rows.push(seats.slice(i, i + perRow));
  }
  return { rows, leftCount: left };
}

function SeatDeck({ title, seats, seatLayout, selectedSeats, onToggleSeat }) {
  if (seats.length === 0) return null;

  const { rows, leftCount } = groupIntoRows(seats, seatLayout);

  return (
    <div className="seat-deck">
      {title && <h4 className="seat-deck-title">{title}</h4>}
      <div className="seat-map-grid">
        {rows.map((row, rowIndex) => (
          <div className="seat-map-row" key={rowIndex}>
            {row.map((seat, seatIndex) => {
              const isBooked = seat.status === "BOOKED";
              const isSelected = selectedSeats.includes(seat.seat_number);

              return (
                <button
                  key={seat.seat_number}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onToggleSeat(seat.seat_number)}
                  className={`seat-btn${isSelected ? " seat-btn-selected" : ""}${
                    isBooked ? " seat-btn-booked" : ""
                  }`}
                  aria-label={`Seat ${seat.seat_number}${
                    isBooked
                      ? ", booked"
                      : isSelected
                        ? ", selected"
                        : ", available"
                  }`}
                  style={
                    seatIndex === leftCount ? { marginLeft: "24px" } : undefined
                  }
                >
                  {seat.seat_number}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeatMap({
  seats,
  seatLayout,
  deckCount,
  selectedSeats,
  onToggleSeat,
}) {
  const isDoubleDeck = deckCount === 2;

  const lowerSeats = seats.filter((s) => s.deck === "LOWER");
  const upperSeats = seats.filter((s) => s.deck === "UPPER");
  const mainSeats = seats.filter((s) => s.deck === "MAIN");

  return (
    <div className="seat-map">
      <div className="seat-map-legend">
        <span className="seat-legend-item">
          <span className="seat-swatch seat-swatch-available" /> Available
        </span>
        <span className="seat-legend-item">
          <span className="seat-swatch seat-swatch-selected" /> Selected
        </span>
        <span className="seat-legend-item">
          <span className="seat-swatch seat-swatch-booked" /> Booked
        </span>
      </div>

      <div className="seat-map-driver-row">
        <span className="seat-map-driver">
          <SteeringWheelIcon />
          Driver
        </span>
      </div>

      {isDoubleDeck ? (
        <div className="seat-map-decks">
          <SeatDeck
            title="Lower Deck"
            seats={lowerSeats}
            seatLayout={seatLayout}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
          <SeatDeck
            title="Upper Deck"
            seats={upperSeats}
            seatLayout={seatLayout}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
        </div>
      ) : (
        <SeatDeck
          seats={mainSeats}
          seatLayout={seatLayout}
          selectedSeats={selectedSeats}
          onToggleSeat={onToggleSeat}
        />
      )}
    </div>
  );
}

export default SeatMap;
