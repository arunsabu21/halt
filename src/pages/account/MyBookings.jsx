import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import NotFound from "../../assets/not-found.svg";
import { getBookings } from "../../services/bookings";
import { formatDate } from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";

import "../../styles/MyBookings.css";

const STATUS_FILTERS = ["ALL", "CONFIRMED", "CANCELLED", "EXPIRED"];

function MyBookings() {
    const [statusFilter, setStatusFilter] = useState("ALL");

    const { data: bookings = [], isLoading, isError, error } = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings,
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

    const filteredBookings =
        statusFilter === "ALL"
            ? bookings
            : bookings.filter((b) => b.status === statusFilter);

    return (
        <div className="my-bookings">
      <h1 className="my-bookings-title">My Bookings</h1>

      <div className="my-bookings-filters">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={`my-bookings-filter${statusFilter === s ? " my-bookings-filter-active" : ""}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <EmptyState
          image={NotFound}
          imageAlt="No bookings"
          title="No bookings found"
          message="You don't have any bookings matching this filter yet."
        />
      ) : (
        <div className="my-bookings-list">
          {filteredBookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking.id}`}
              key={booking.id}
              className="booking-card"
            >
              <div className="booking-card-main">
                <span className="booking-card-reference">{booking.booking_reference}</span>
                <span className="booking-card-route">{booking.route}</span>
                <span className="booking-card-date">
                  <Clock size={14} />
                  {formatDate(booking.travel_date)}
                </span>
              </div>

              <div className="booking-card-aside">
                <span className="booking-card-seats">
                  {booking.active_passenger_count}/{booking.seat_count} seats active
                </span>
                <span className="booking-card-amount">₹{booking.total_amount}</span>
                <span className={`booking-card-status booking-card-status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    );
}

export default MyBookings;
