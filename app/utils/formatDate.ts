export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const formatted = dateObj.toLocaleDateString("de", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatted;
};
