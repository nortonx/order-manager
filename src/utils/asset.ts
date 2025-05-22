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
