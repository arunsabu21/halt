export const buildStopSequence = (routeStopsData, trip) => {
  if (!routeStopsData || !trip) return [];

  const { source_city, destination_city, stops } = routeStopsData;

  const sequence = [
    {
      id: "source",
      city: source_city,
      time: trip.departure_time,
      type: "boarding",
    },
    ...stops.map((stop) => ({
      id: stop.id,
      city: stop.city,
      time: stop.arrival_time,
      type: "intermediate",
    })),
    {
      id: "destination",
      city: destination_city,
      time: trip.arrival_time,
      type: "drop",
    },
  ];

  return sequence;
};
