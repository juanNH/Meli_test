import { render } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb Component", () => {
  it("renders categories correctly", () => {
    const categories = ["Category 1", "Category 2", "Category 3"];
    const { getByText } = render(<Breadcrumb categories={categories} />);

    categories.forEach((category) => {
      const categoryElement = getByText(category);
      expect(categoryElement).toBeInTheDocument();
    });

    // Check separators
    const separators = getByText(">");
    expect(separators).toBeInTheDocument();
    expect(separators).toHaveClass("separator");
  });

  it("renders single category without separator", () => {
    const categories = ["Single Category"];
    const { getByText, queryByText } = render(
      <Breadcrumb categories={categories} />
    );

    const categoryElement = getByText(categories[0]);
    expect(categoryElement).toBeInTheDocument();

    // Check that separator is not rendered
    const separator = queryByText(">");
    expect(separator).toBeNull();
  });

  it("renders empty list with no categories", () => {
    const categories = [];
    const { container } = render(<Breadcrumb categories={categories} />);

    // Check that breadcrumb renders without any items
    const breadcrumb = container.querySelector(".breadcrumb");
    expect(breadcrumb).toBeInTheDocument();
    expect(breadcrumb.children.length).toBe(0);
  });

  it("throws error if categories prop is not provided", () => {
    // Suppress prop types warnings during the test
    const propTypesError = jest.spyOn(console, "error");
    propTypesError.mockImplementation(() => {});

    expect(() => {
      render(<Breadcrumb />);
    }).toThrow("Failed prop type");

    propTypesError.mockRestore();
  });
});
