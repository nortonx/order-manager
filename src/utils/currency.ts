export const formatCurrency = (
  amount: number,
  currency = "BRL",
  locale = "pt-BR",
) => {
  if (Number.isNaN(amount)) return NaN;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatCurrencyToNumber = (amount: number, locale = "pt-BR") => {
  if (Number.isNaN(amount)) return NaN;
  return new Intl.NumberFormat(locale).format(amount);
};
