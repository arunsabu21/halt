import axiosInstance from "./axiosInstance";

export const getCities = async () => {
  const response = axiosInstance.get("/cities/");
  return response.data;
};
