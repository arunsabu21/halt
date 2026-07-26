import axiosInstance from "./axiosInstance";

export const searchTrips = async ({ source, destination, travel_date }) => {
  const response = await axiosInstance.get("/trips/search/", {
    params: { source, destination, travel_date },
  });
  return response.data;
};

export const getTripDetails = async (tripId) => {
  const response = await axiosInstance.get(`/trips/${tripId}/`);
  return response.data;
};

export const getTripSeats = async (tripId) => {
  const response = await axiosInstance.get(`/trips/${tripId}/seats/`);
  return response.data;
};
