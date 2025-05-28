import { formatDate } from "@/utils/asset";
import { describe, it, expect } from "@jest/globals";

describe("formatDate function", () => {
  it("should format date correctly", () => {
    const date = new Date("2023-10-01T12:00:00Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("01/10/2023, 09:00:00");
  });

  it("should handle invalid date", () => {
    const invalidDate = new Date("invalid-date");
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe("Invalid Date");
  });

  it("should handle null date", () => {
    const formattedDate = formatDate(null);
    expect(formattedDate).toBe("Invalid Date");
  });
});
