export default function transformDate(dateString) {
  const date = new Date(dateString);
  const transformedDate = date.toISOString().split("T")[0];

  return transformedDate;
}
