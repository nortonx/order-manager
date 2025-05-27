/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency to use (default: "BRL")
 * @param locale - The locale to use (default: "pt-BR")
 * @returns Formatted currency string or NaN if input is not a number
 */
export const formatCurrency = (
  amount: number,
  currency = "BRL",
  locale = "pt-BR"
) => {
  // Check for invalid input
  if (typeof amount !== "number" || Number.isNaN(Number(amount))) {
    return "NaN";  // Return "NaN" as a string instead of the NaN value
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(amount));
};
