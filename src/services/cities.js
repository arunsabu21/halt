import axiosInstance from "./axiosInstance";

export const getCities = async () => {
  const response = await axiosInstance.get("/cities/");
  return response.data;
};
