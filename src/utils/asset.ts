/**
 * Formats a trading side ('buy' or 'sell') to its Portuguese equivalent.
 *
 * @param side - The side of the trade (e.g., 'buy', 'sell')
 * @returns The Portuguese translation of the trading side ('Compra', 'Venda', or 'Desconhecido' if unknown)
 */
export const formatSide = (side: string) => {
  switch (side.toLowerCase()) {
    case "buy":
      return "Compra";
    case "sell":
      return "Venda";
    default:
      return "Desconhecido";
  }
};

/**
 * Formats a status string to its Portuguese equivalent.
 *
 * @param status - The status to format (e.g., 'open', 'closed', 'pending', 'completed', 'cancelled')
 * @returns The Portuguese translation of the status ('Aberto', 'Fechado', 'Pendente', 'Concluído', 'Cancelado', or 'Desconhecido' if unknown)
 */
export const formatStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "Aberto";
    case "closed":
      return "Fechado";
    case "pending":
      return "Pendente";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
};

/**
 * Formats a date string to a localized Brazilian Portuguese date and time format.
 *
 * @param date - The date string to format
 * @returns The formatted date string in Brazilian Portuguese format (DD/MM/YYYY, HH:MM:SS)
 */
export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleString("pt-BR", options);
};
