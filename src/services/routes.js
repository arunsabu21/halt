import axiosInstance from "./axiosInstance";

export const getRouteStops = async (routeId) => {
  const response = await axiosInstance.get(`/routes/${routeId}/stops/`);
  return response.data;
};
