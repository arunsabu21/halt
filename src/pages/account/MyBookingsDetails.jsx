import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, Clock, MapPin, User } from "lucide-react";
import NotFound from "../../assets/not-found.svg";
import {
  getBookingDetails,
  cancelPassenger,
  downloadTicket,
} from "../../services/bookings";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import getErrorMessage from "../../utils/getErrorMessage";
import { useToast } from "../../hooks/useToast";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";
import "../../styles/BookingDetails.css";

const CANCELLATION_CUTOFF_HOURS = 6;

function MyBookingsDetails() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [cancellingId, setCancellingId] = useState(null);
  const [pendingCancel, setPendingCancel] = useState(null);

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking-details", bookingId],
    queryFn: () => getBookingDetails(bookingId),
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <EmptyState
        image={NotFound}
        imageAlt="Something went wrong"
        title="Something went wrong"
        message={getErrorMessage(error)}
      />
    );
  }

  const isBeforeCutoff = () => {
    const departure = new Date(
      `${booking.travel_date}T${booking.departure_time}`,
    );
    const cutoff = new Date(
      departure.getTime() - CANCELLATION_CUTOFF_HOURS * 60 * 60 * 1000,
    );
    return new Date() < cutoff;
  };

  const canCancel = booking.status === "CONFIRMED" && isBeforeCutoff();

  const handleCancelClick = (passengerId, seatNumber) => {
    setPendingCancel({ passengerId, seatNumber });
  };

  const handleConfirmCancel = async () => {
    const { passengerId, seatNumber } = pendingCancel;
    setPendingCancel(null);
    setCancellingId(passengerId);

    try {
      await cancelPassenger(bookingId, passengerId);
      showToast("success", `Seat ${seatNumber} cancelled successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["booking-details", bookingId],
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    } catch (err) {
      showToast("error", getErrorMessage(err));
    } finally {
      setCancellingId(null);
    }
  };

  const handleDownloadTicket = async (passengerId, seatNumber) => {
    try {
      const blob = await downloadTicket(bookingId, passengerId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `ticket_${booking.booking_reference}_${seatNumber}.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      showToast("error", "Could not download ticket");
    }
  };

  return (
    <div className="booking-details-page">
      <Link to="/account/bookings" className="booking-details-back">
        <ArrowLeft size={16} />
        Back to My Bookings
      </Link>

      <div className="booking-details-header">
        <div>
          <span className="booking-details-reference">
            {booking.booking_reference}
          </span>
          <h1 className="booking-details-route">{booking.route}</h1>
        </div>
        <span
          className={`booking-details-status booking-details-status-${booking.status.toLowerCase()}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="booking-details-grid">
        <div className="booking-details-main">
          <div className="detail-panel">
            <h3 className="detail-panel-title">Trip Info</h3>
            <div className="detail-row">
              <span className="detail-row-label">
                <Clock size={14} /> Travel Date
              </span>
              <span className="detail-row-value">
                {formatDate(booking.travel_date)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-row-label">Departure</span>
              <span className="detail-row-value">
                {formatTime(booking.departure_time)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-row-label">Arrival</span>
              <span className="detail-row-value">
                {formatTime(booking.arrival_time)}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-row-label">
                <MapPin size={14} /> Boarding Point
              </span>
              <span className="detail-row-value">{booking.boarding_point}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row-label">
                <MapPin size={14} /> Drop Point
              </span>
              <span className="detail-row-value">{booking.drop_point}</span>
            </div>
          </div>

          <div className="detail-panel">
            <h3 className="detail-panel-title">Passengers</h3>
            <div className="passenger-list">
              {booking.passenger_details.map((p) => (
                <div className="passenger-row" key={p.id}>
                  <div className="passenger-row-info">
                    <span className="passenger-row-seat">{p.seat_number}</span>
                    <div>
                      <p className="passenger-row-name">
                        <User size={13} /> {p.full_name}
                      </p>
                      <p className="passenger-row-meta">
                        {p.age} yrs · {p.gender}
                      </p>
                    </div>
                  </div>

                  <div className="passenger-row-actions">
                    <span
                      className={`passenger-row-status passenger-row-status-${p.status.toLowerCase()}`}
                    >
                      {p.status}
                    </span>

                    <button
                      type="button"
                      className="passenger-action-btn"
                      onClick={() => handleDownloadTicket(p.id, p.seat_number)}
                    >
                      <Download size={14} /> Ticket
                    </button>

                    {canCancel && p.status === "ACTIVE" && (
                      <button
                        type="button"
                        className="passenger-action-btn passenger-action-btn-danger"
                        onClick={() => handleCancelClick(p.id, p.seat_number)}
                        disabled={cancellingId === p.id}
                      >
                        {cancellingId === p.id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-details-aside">
          <div className="detail-panel">
            <h3 className="detail-panel-title">Payment Summary</h3>
            <div className="detail-row">
              <span className="detail-row-label">Total Paid</span>
              <span className="detail-row-value">₹{booking.total_amount}</span>
            </div>
            {Number(booking.refunded_amount) > 0 && (
              <div className="detail-row">
                <span className="detail-row-label">Refunded</span>
                <span className="detail-row-value detail-row-value-danger">
                  −₹{booking.refunded_amount}
                </span>
              </div>
            )}
            <div className="detail-row detail-row-total">
              <span className="detail-row-label">Net Paid</span>
              <span className="detail-row-value">₹{booking.net_paid}</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(pendingCancel)}
        title="Cancel this ticket?"
        message={
          pendingCancel
            ? `Cancel the ticket for seat ${pendingCancel.seatNumber}? This cannot be undone, and a refund will be processed to your original payment method.`
            : ""
        }
        confirmLabel="Cancel Ticket"
        danger
        onConfirm={handleConfirmCancel}
        onCancel={() => setPendingCancel(null)}
      />
    </div>
  );
}

export default MyBookingsDetails;
