import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: Boolean(localStorage.getItem("access_token")),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
