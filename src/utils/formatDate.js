export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-In", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
