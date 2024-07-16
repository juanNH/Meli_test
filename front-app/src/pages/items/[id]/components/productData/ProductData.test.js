import { render, screen } from "@testing-library/react";
import { ProductData } from "./ProductData";

describe("ProductData Component", () => {
  const mockProps = {
    sold_quantity: 20,
    price: "1000",
    decimals: "00",
    condition: "Nuevo",
    title: "Producto de prueba",
  };

  it("renders the condition and sold quantity correctly", () => {
    render(<ProductData {...mockProps} />);
    const conditionAndSold = screen.getByText(/Nuevo - 20 vendidos/i);
    expect(conditionAndSold).toBeInTheDocument();
  });

  it("renders the product title correctly", () => {
    render(<ProductData {...mockProps} />);
    const titleElement = screen.getByRole("heading", {
      level: 5,
      name: /Producto de prueba/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the price and decimals correctly", () => {
    render(<ProductData {...mockProps} />);
    const priceElement = screen.getByText(/\$ 1000/i, {
      selector: ".product-detail-price",
    });
    const decimalsElement = screen.getByText(/00/i, {
      selector: ".product-detail-price-decimals",
    });
    expect(priceElement).toBeInTheDocument();
    expect(decimalsElement).toBeInTheDocument();
  });

  it("renders the comprar button", () => {
    render(<ProductData {...mockProps} />);
    const buttonElement = screen.getByRole("button", { name: /comprar/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
