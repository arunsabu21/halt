export const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return "";

  const [depH, depM] = departureTime.split(":").map(Number);
  const [arrH, arrM] = arrivalTime.split(":").map(Number);

  let depMinutes = depH * 60 + depM;
  let arrMinutes = arrH * 60 + arrM;

  if (arrMinutes <= depMinutes) {
    arrMinutes += 24 * 60;
  }

  const totalMinutes = arrMinutes - depMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};
