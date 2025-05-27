import { formatCurrency } from "@/utils/currency";
import { describe, it, expect } from "@jest/globals";

describe("formatCurrency", () => {
  it("formats BRL in pt-BR by default", () => {
    // First check if the result is a string
    expect(typeof formatCurrency(1234)).toBe("string");

    // Then check the format with a regex that allows for flexible spacing
    expect(formatCurrency(1234)).toMatch(/^R\$\s*1\.234,00$/);
    expect(formatCurrency(1234.56)).toMatch(/^R\$\s*1\.234,56$/);
    expect(formatCurrency(-1234)).toMatch(/^-R\$\s*1\.234,00$/);
    expect(formatCurrency(0)).toMatch(/^R\$\s*0,00$/);

  });

  it("formats USD in en-US", () => {
    expect(formatCurrency(1234, "USD", "en-US")).toBe("$1,234.00");
    expect(formatCurrency(-1234.56, "USD", "en-US")).toBe("-$1,234.56");
    expect(formatCurrency(0, "USD", "en-US")).toBe("$0.00");
  });

  it("formats EUR in de-DE", () => {
    expect(formatCurrency(1234, "EUR", "de-DE")).toBe("1.234,00 €");
    expect(formatCurrency(-1234.56, "EUR", "de-DE")).toBe("-1.234,56 €");
    expect(formatCurrency(0, "EUR", "de-DE")).toBe("0,00 €");
  });

  it("formats JPY in ja-JP (no decimals)", () => {
    expect(formatCurrency(1234, "JPY", "ja-JP")).toBe("￥1,234");
    expect(formatCurrency(-1234, "JPY", "ja-JP")).toBe("-￥1,234");
    expect(formatCurrency(0, "JPY", "ja-JP")).toBe("￥0");
  });

  it("rounds to two decimal places for currencies with decimals", () => {
    expect(formatCurrency(1.555, "USD", "en-US")).toBe("$1.56");
    expect(formatCurrency(1.554, "USD", "en-US")).toBe("$1.55");
    expect(formatCurrency(-1.555, "USD", "en-US")).toBe("-$1.56");
    expect(formatCurrency(-1.554, "USD", "en-US")).toBe("-$1.55");
  });

  it("handles very large and very small numbers", () => {
    expect(formatCurrency(1e12, "USD", "en-US")).toBe("$1,000,000,000,000.00");
    expect(formatCurrency(1e-2, "USD", "en-US")).toBe("$0.01");
    expect(formatCurrency(-1e12, "USD", "en-US")).toBe(
      "-$1,000,000,000,000.00"
    );
    expect(formatCurrency(-1e-2, "USD", "en-US")).toBe("-$0.01");
  });

  it("handles NaN and invalid input", () => {
    // Now we expect the string "NaN" for invalid inputs

    // @ts-expect-error - Testing with invalid type (string instead of number)
    expect(formatCurrency("#")).toBe("NaN");

    // @ts-expect-error - Testing with undefined
    expect(formatCurrency(undefined)).toBe("NaN");

    // @ts-expect-error - Testing with null
    expect(formatCurrency(null)).toBe("NaN");

    // Test with NaN value
    expect(formatCurrency(NaN)).toBe("NaN");

    // @ts-expect-error - Testing with string number (should be parsed by Number() before passing)
    expect(formatCurrency("123")).toBe("NaN");
  });
});
