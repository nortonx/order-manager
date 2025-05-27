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
