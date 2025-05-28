/**
 * Formats a date string to a localized Brazilian Portuguese date and time format.
 *
 * @param date - The date string to format
 * @returns The formatted date string in Brazilian Portuguese format (DD/MM/YYYY, HH:MM:SS) or "Invalid Date" if the input is invalid
 */
export const formatDate = (date: string) => {
  if (!date) {
    return "Invalid Date";
  }
  const dateObj = new Date(date);

  // Check if the date is invalid
  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return dateObj.toLocaleString("pt-BR", options);
};
