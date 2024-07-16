import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";
describe("Breadcrumb Component", () => {
  it("renders categories correctly", () => {
    const categories = ["Category 1", "Category 2", "Category 3"];
    render(
      <Breadcrumb categories={categories} />
    );

    categories.forEach((category) => {
      const categoryElement = screen.getByText(category);
      expect(categoryElement).toBeInTheDocument();
    });

    // Check separators
    const separatorElements = screen.getAllByText((content, element) => {
      return content === ">" && element.classList.contains("separator");
    });

    expect(separatorElements).toHaveLength(categories.length - 1);
  });

  it("renders single category without separator", () => {
    const categories = ["Single Category"];
    render(
      <Breadcrumb categories={categories} />
    );

    const categoryElement = screen.getByText(categories[0]);
    expect(categoryElement).toBeInTheDocument();

    // Check that separator is not rendered
    const separator = screen.queryByText(">");
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
    }).toThrow("Cannot read properties of undefined (reading 'map')");

    propTypesError.mockRestore();
  });
});
