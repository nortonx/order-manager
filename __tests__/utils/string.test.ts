import { capitalizeFirstLetter } from "@/utils";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should return an empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should not modify a string that is already capitalized", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });
});
