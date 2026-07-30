import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initiateBooking } from "../services/bookings";
import {
  getBookingDraft,
  updateBookingDraft,
  clearBookingDraft,
} from "../utils/bookingDraft";
import getErrorMessage from "../utils/getErrorMessage";
import PageLoader from "../components/common/PageLoader";

import "../styles/PassengerDetails.css";

function PassengerDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [draft] = useState(() => getBookingDraft());
  
  const [passengers, setPassengers] = useState(() => {
    const stored = getBookingDraft();

    return (
      stored?.selectedSeats?.map((seatNumber) => ({
        seat_number: seatNumber,
        full_name: "",
        age: "",
        gender: "",
      })) ?? []
    );
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (
      !draft ||
      draft.tripId !== tripId ||
      !draft.selectedSeats?.length ||
      !draft.boardingPoint ||
      !draft.dropPoint
    ) {
      navigate(`/trips/${tripId}/seats`, { replace: true });
    }
  }, [draft, tripId, navigate]);

  if (!draft) return <PageLoader />;

  const handleFieldChange = (seatNumber, field, value) => {
    setPassengers((prev) =>
      prev.map((p) =>
        p.seat_number === seatNumber ? { ...p, [field]: value } : p,
      ),
    );

    setErrors((prev) => ({ ...prev, [`${seatNumber}_${field}`]: null }));
  };

  const validate = () => {
    const nextErrors = {};

    passengers.forEach((p) => {
      if (!p.full_name.trim()) {
        nextErrors[`${p.seat_number}_full_name`] = "Name is required";
      }
      const age = Number(p.age);

      if (!p.age || Number.isNaN(age) || age < 1 || age > 120) {
        nextErrors[`${p.seat_number}_age`] = "Please enter a valid age";
      }

      if (!p.gender) {
        nextErrors[`${p.seat_number}_gender`] = "Please select a gender";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalPassengers = passengers.map((p) => ({
      ...p,
      age: Number(p.age),
    }));

    updateBookingDraft({ passengers: finalPassengers });

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { checkout_url } = await initiateBooking({
        trip: draft.tripId,
        seatNumbers: draft.selectedSeats,
        boardingPoint: draft.boardingPoint,
        dropPoint: draft.dropPoint,
        passengers: finalPassengers,
      });

      clearBookingDraft();
      window.location.href = checkout_url;
    } catch (err) {
      setSubmitError(getErrorMessage(err));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="passenger-details">
      <h1 className="passenger-details-title">Passenger Details</h1>
      <p className="passenger-details-subtitle">
        {draft.boardingPoint} → {draft.dropPoint}
      </p>

      <form
        className="passenger-details-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {passengers.map((p) => (
          <div className="passenger-card" key={p.seat_number}>
            <h3 className="passenger-card-title">
              Passenger for Seat {p.seat_number}
            </h3>

            <div className="passenger-field">
              <label htmlFor={`name-${p.seat_number}`}>Full Name</label>
              <input
                id={`name-${p.seat_number}`}
                type="text"
                value={p.full_name}
                onChange={(e) =>
                  handleFieldChange(p.seat_number, "full_name", e.target.value)
                }
                className={
                  errors[`${p.seat_number}_full_name`] ? "input-error" : ""
                }
              />
              {errors[`${p.seat_number}_full_name`] && (
                <span className="field-error">
                  {errors[`${p.seat_number}_full_name`]}
                </span>
              )}
            </div>

            <div className="passenger-field-row">
              <div className="passenger-field">
                <label htmlFor={`age-${p.seat_number}`}>Age</label>
                <input
                  id={`age-${p.seat_number}`}
                  type="number"
                  min="1"
                  max="120"
                  value={p.age}
                  onChange={(e) =>
                    handleFieldChange(p.seat_number, "age", e.target.value)
                  }
                  className={
                    errors[`${p.seat_number}_age`] ? "input-error" : ""
                  }
                />
                {errors[`${p.seat_number}_age`] && (
                  <span className="field-error">
                    {errors[`${p.seat_number}_age`]}
                  </span>
                )}
              </div>

              <div className="passenger-field">
                <span className="passenger-gender-label">Gender</span>
                <div className="passenger-gender-options">
                  <label className="passenger-radio">
                    <input
                      type="radio"
                      name={`gender-${p.seat_number}`}
                      value="MALE"
                      checked={p.gender === "MALE"}
                      onChange={(e) =>
                        handleFieldChange(
                          p.seat_number,
                          "gender",
                          e.target.value,
                        )
                      }
                    />
                    Male
                  </label>
                  <label className="passenger-radio">
                    <input
                      type="radio"
                      name={`gender-${p.seat_number}`}
                      value="FEMALE"
                      checked={p.gender === "FEMALE"}
                      onChange={(e) =>
                        handleFieldChange(
                          p.seat_number,
                          "gender",
                          e.target.value,
                        )
                      }
                    />
                    Female
                  </label>
                </div>
                {errors[`${p.seat_number}_gender`] && (
                  <span className="field-error">
                    {errors[`${p.seat_number}_gender`]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {submitError && (
          <p className="passenger-details-submit-error">{submitError}</p>
        )}

        <button
          type="submit"
          className="passenger-details-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Redirecting to payment..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
}

export default PassengerDetails;
