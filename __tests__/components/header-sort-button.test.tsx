import { render } from "@testing-library/react";
import HeaderSortButton from "@/components/header-sort-button";

describe("HeaderSortButton", () => {
  it("renders correctly", () => {
    const column = {
      id: "test-column",
      getIsSorted: jest.fn(() => false),
      toggleSorting: jest.fn(),
    };

    const { getByText } = render(<HeaderSortButton column={column} />);

    expect(getByText("Test-column")).toBeInTheDocument();
  });
});
