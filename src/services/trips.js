import axiosInstance from "./axiosInstance";

export const searchTrips = async ({ source, destination, travel_date }) => {
  const response = await axiosInstance.get("/trips/search/", {
    params: { source, destination, travel_date },
  });
  return response.data;
};
