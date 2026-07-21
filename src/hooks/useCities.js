import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/cities";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 60,
  });
};
