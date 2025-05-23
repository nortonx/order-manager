import { formatSide, formatStatus } from "@/utils/asset";
import { describe, it, expect } from "@jest/globals";

describe("formatSide", () => {
  it("should return 'Compra' for 'buy' (case-insensitive)", () => {
    expect(formatSide("buy")).toBe("Compra");
    expect(formatSide("BUY")).toBe("Compra");
    expect(formatSide("BuY")).toBe("Compra");
  });

  it("should return 'Venda' for 'sell' (case-insensitive)", () => {
    expect(formatSide("sell")).toBe("Venda");
    expect(formatSide("SELL")).toBe("Venda");
    expect(formatSide("SeLl")).toBe("Venda");
  });

  it("should return 'Desconhecido' for unknown values", () => {
    expect(formatSide("hold")).toBe("Desconhecido");
    expect(formatSide("")).toBe("Desconhecido");
    expect(formatSide("random")).toBe("Desconhecido");
  });
});

describe("formatStatus", () => {
  it("should return 'Aberto' for 'open' (case-insensitive)", () => {
    expect(formatStatus("open")).toBe("Aberto");
    expect(formatStatus("OPEN")).toBe("Aberto");
    expect(formatStatus("OpEn")).toBe("Aberto");
  });

  it("should return 'Fechado' for 'closed' (case-insensitive)", () => {
    expect(formatStatus("closed")).toBe("Fechado");
    expect(formatStatus("CLOSED")).toBe("Fechado");
    expect(formatStatus("ClOsEd")).toBe("Fechado");
  });

  it("should return 'Pendente' for 'pending' (case-insensitive)", () => {
    expect(formatStatus("pending")).toBe("Pendente");
    expect(formatStatus("PENDING")).toBe("Pendente");
    expect(formatStatus("PeNdInG")).toBe("Pendente");
  });

  it("should return 'Concluído' for 'completed' (case-insensitive)", () => {
    expect(formatStatus("completed")).toBe("Concluído");
    expect(formatStatus("COMPLETED")).toBe("Concluído");
    expect(formatStatus("CoMpLeTeD")).toBe("Concluído");
  });

  it("should return 'Cancelado' for 'cancelled' (case-insensitive)", () => {
    expect(formatStatus("cancelled")).toBe("Cancelado");
    expect(formatStatus("CANCELLED")).toBe("Cancelado");
    expect(formatStatus("CaNcElLeD")).toBe("Cancelado");
  });

  it("should return 'Desconhecido' for unknown values", () => {
    expect(formatStatus("in progress")).toBe("Desconhecido");
    expect(formatStatus("")).toBe("Desconhecido");
    expect(formatStatus("random")).toBe("Desconhecido");
  });
});
