/**
 * Capitalizes the first letter of a given string, ignoring leading whitespace.
 *
 * @param str - The string to capitalize
 * @returns The string with its first letter capitalized, or an empty string if the input is falsy
 *
 * @example
 * const result = capitalizeFirstLetter("hello"); // Returns "Hello"
 * const withSpace = capitalizeFirstLetter(" hello"); // Returns " Hello"
 * const emptyResult = capitalizeFirstLetter(""); // Returns ""
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
