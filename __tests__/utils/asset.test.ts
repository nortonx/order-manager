import { formatDate } from "@/utils/asset";
import { describe, it, expect } from "@jest/globals";

describe("formatDate function", () => {
  it("should format date string correctly", () => {
    const dateString = "2023-10-01T12:00:00Z";
    const formattedDate = formatDate(dateString);

    // Check format pattern instead of exact time (timezone-independent)
    expect(formattedDate).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    // Verify that the date part is correct, regardless of the time
    expect(formattedDate).toContain("01/10/2023");
  });

  it("should handle invalid date string", () => {
    const formattedDate = formatDate("invalid-date");
    expect(formattedDate).toBe("Invalid Date");
  });

  it("should handle empty string", () => {
    const formattedDate = formatDate("");
    expect(formattedDate).toBe("Invalid Date");
  });

  it("should handle null input", () => {
    // @ts-expect-error - Testing runtime behavior with wrong type
    const formattedDate = formatDate(null);
    expect(formattedDate).toBe("Invalid Date");
  });
});
