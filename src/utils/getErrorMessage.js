export default function getErrorMessage(error) {
  const data = error.response?.data;

  if (!data) return "Something went wrong. Try again later.";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;

  const firstValue = Object.values(data)[0];

  if (Array.isArray(firstValue)) {
    return firstValue[0];
  }

  return firstValue || "Something went wrong. Try again later.";
}
