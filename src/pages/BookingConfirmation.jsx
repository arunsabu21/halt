import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { getBookingBySession } from "../services/bookings";
import PageLoader from "../components/common/PageLoader";

import "../styles/BookingConfirmation.css";

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 15;

function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [booking, setBooking] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(null);

  // TODO: Use toast for error messages
  useEffect(() => {
    if (!sessionId) {
      setError( // TODO: setState Error fix
        "Missing payment session. Please check My Bookings for your booking status",
      );
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const data = await getBookingBySession(sessionId);
        if (cancelled) return;

        if (data.status === "CONFIRMED" || data.status === "EXPIRED") {
          setBooking(data);
          return;
        }

        if (attempts < MAX_POLL_ATTEMPTS) {
          setTimeout(() => setAttempts((a) => a + 1), POLL_INTERVAL_MS);
        } else {
          setBooking(data);
        }
      } catch (err) {
        console.log(err);
        if (!cancelled) {
          setError("Couldn't verify your booking. Please check My Bookings.");
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId, attempts]);

  if (error) {
    return (
      <div className="booking-confirmation">
        <XCircle className="booking-confirmation-icon booking-confirmation-icon-icon-error" />
        <h1 className="booking-confirmation-title">Something went wrong</h1>
        <p className="booking-confirmation-text">{error}</p>
        <Link to="/" className="booking-confirmation-link">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!booking) return <PageLoader />;

  if (booking.status === "CONFIRMED") {
    return (
      <div className="booking-confirmation">
        <CheckCircle2 className="booking-confirmation-icon booking-confirmation-icon-success" />
        <h1 className="booking-confirmation-title">Booking Confirmed!</h1>
        <p className="booking-confirmation-text">
          Your booking reference is <strong>{booking.booking_reference}</strong>
          . A confirmation has been sent to your email.
        </p>
        <Link to="/" className="booking-confirmation-link">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="booking-confirmation">
      <XCircle className="booking-confirmation-icon booking-confirmation-icon-error" />
      <h1 className="booking-confirmation-title">Booking Not Confirmed</h1>
      <p className="booking-confirmation-text">
        We couldn't confirm your seats — they may have been taken, or payment is
        still processing. If you were charged, this will be refunded
        automatically. Please check My Bookings shortly.
      </p>
      <Link to="/" className="booking-confirmation-link">
        Back to Home
      </Link>
    </div>
  );
}

export default BookingConfirmation;
