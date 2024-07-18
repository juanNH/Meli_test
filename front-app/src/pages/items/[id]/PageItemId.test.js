import { render, screen } from "@testing-library/react";
import Page from "./PageItemId";
import { useItem } from "../../../hooks";
import { formatNumber } from "../../../helpers";

// Mocking the useItem hook
jest.mock("./../../../hooks", () => ({
  useItem: jest.fn(),
}));

// Mocking the formatNumber helper
jest.mock("./../../../helpers", () => ({
  formatNumber: jest.fn(),
}));

describe("Page Component", () => {
  it("renders skeleton loader when item is loading", () => {
    useItem.mockReturnValue({ item: null, isLoading: true });
    render(<Page />);
    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toBeInTheDocument();
  });

  it("renders item data when loading is complete", () => {
    const mockItem = {
      item: {
        picture: "https://via.placeholder.com/150",
        title: "Mock Item Title",
        sold_quantity: 10,
        condition: "New",
        price: {
          amount: 1000,
          decimals: "99",
        },
        description: "Mock description of the item.",
      },
    };

    useItem.mockReturnValue({ item: mockItem, isLoading: false });
    formatNumber.mockReturnValue("1,000");

    render(<Page />);

    const image = screen.getByRole("img", { name: /mock item title/i });
    const title = screen.getByText(/mock item title/i);
    const conditionAndSold = screen.getByText(/new - 10 vendidos/i);
    const price = screen.getByText(/\$ 1,000/i);
    const decimals = screen.getByText(/99/i);
    const description = screen.getByText(/mock description of the item./i);

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(conditionAndSold).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(decimals).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it("renders item data when loading is complete but decimals is 0", () => {
    const mockItem = {
      item: {
        picture: "https://via.placeholder.com/150",
        title: "Mock Item Title",
        sold_quantity: 10,
        condition: "New",
        price: {
          amount: 999,
          decimals: 0,
        },
        description: "Mock description of the item.",
      },
    };

    useItem.mockReturnValue({ item: mockItem, isLoading: false });

    render(<Page />);


    const decimals = screen.getByText(/00/i, {
        selector: ".product-detail-price-decimals",
      });
    expect(decimals).toBeInTheDocument();
  });
});
