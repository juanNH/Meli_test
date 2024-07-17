import { render, screen } from "@testing-library/react";
import { ItemList } from "./ItemList";

// Mock de Item
jest.mock("./../item/Item", () => ({
  Item: jest.fn(() => <div data-testid="item-component" />),
}));

// Mock de priceFormat
jest.mock("./../../../../helpers", () => ({
  priceFormat: jest.fn((amount, decimals) => `${amount}.${decimals}`),
}));

describe("ItemList Component", () => {
  const items = [
    {
      id: "1",
      title: "Item 1",
      price: { currency: "USD", amount: 100, decimals: 0 },
      picture: "http://example.com/item1.jpg",
      condition: "new",
      free_shipping: true,
    },
    {
      id: "2",
      title: "Item 2",
      price: { currency: "USD", amount: 200, decimals: 99 },
      picture: "http://example.com/item2.jpg",
      condition: "used",
      free_shipping: false,
    },
  ];

  it("renders skeletons when loading", () => {
    render(<ItemList items={[]} isLoading={true} />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(4);
  });

  it("renders items when not loading", () => {
    const { container, queryAllByTestId } = render(
      <ItemList items={items} isLoading={false} />
    );
    const skeletonItems = queryAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(0);
    const itemListContainer = container.querySelector(".product-list");
    expect(itemListContainer).toBeInTheDocument();
    expect(itemListContainer.children.length).toBe(items.length);
  });

  it("calls priceFormat with correct arguments", () => {
    render(<ItemList items={items} isLoading={false} />);

    expect(require("./../../../../helpers").priceFormat).toHaveBeenCalledWith(
      100,
      0
    );
    expect(require("./../../../../helpers").priceFormat).toHaveBeenCalledWith(
      200,
      99
    );
    
  });
});
