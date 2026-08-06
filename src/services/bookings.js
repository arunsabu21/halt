import axiosInstance from "./axiosInstance";

export const initiateBooking = async ({
  trip,
  seatNumbers,
  boardingPoint,
  dropPoint,
  passengers,
}) => {
  const response = await axiosInstance.post("/bookings/initiate/", {
    trip,
    seat_numbers: seatNumbers,
    boarding_point: boardingPoint,
    drop_point: dropPoint,
    passengers,
  });

  return response.data;
};

export const getBookingsDetails = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}/`);
  return response.data;
};

export const getBookingBySession = async (sessionId) => {
  const response = await axiosInstance.get("/bookings/by-session/", {
    params: { session_id: sessionId },
  });

  return response.data;
};

export const getBookings = async () => {
  const response = await axiosInstance.get("/bookings/");
  return response.data;
};

export const getBookingDetails = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}/`);
  return response.data;
};

export const cancelPassenger = async (bookingId, passengerId) => {
  const response = await axiosInstance.patch(
    `/bookings/${bookingId}/passengers/${passengerId}/cancel/`,
  );
  return response.data;
};
