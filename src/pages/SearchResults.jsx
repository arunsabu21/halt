import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../assets/not-found.svg";
import { searchTrips } from "../services/trips";
import PageLoader from "../components/common/PageLoader";
import getErrorMessage from "../utils/getErrorMessage";
import { formatDate } from "../utils/formatDate";
import EmptyState from "../components/common/EmptyState";
import TripCard from "../components/trips/TripCard";

import "../styles/SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const travelDate = searchParams.get("travel_date");

  const {
    data: trips = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trip-search", source, destination, travelDate],
    queryFn: () =>
      searchTrips({ source, destination, travel_date: travelDate }),
    enabled: Boolean(source && destination && travelDate),
  });

  const handleSelectTrip = (trip) => {
    // TODO: Navigate to the seat selection page for the current trip
    navigate(`/trips/${trip.id}/seats`);
  };

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

  if (trips.length === 0) {
    return (
      <EmptyState
        image={NotFound}
        imageAlt="No buses found"
        title="No Buses found"
        message={
          <>
            We couldn't find any buses from <strong>{source}</strong> to{" "}
            <strong>{formatDate(travelDate)}</strong>. Try a different date or
            route.
          </>
        }
      />
    );
  }

  return (
    <div className="search-results">
      <h2 className="search-results-heading">
        {trips.length} {trips.length === 1 ? "bus" : "buses"} found
        <span className="search-results-subheading">
          {source} {destination} {formatDate(travelDate)}
        </span>
      </h2>

      <div className="search-results-list">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onSelect={handleSelectTrip} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
