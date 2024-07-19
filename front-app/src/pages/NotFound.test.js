import { render, screen, fireEvent  } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "./NotFound";

describe("NotFound component", () => {
  it("should render NotFound correctly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Parece que esta página no existe!")
    ).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: /Ir a la página principal/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("should navigate to the home page when the link is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", {
      name: /Ir a la página principal/i,
    });
    fireEvent.click(linkElement);

    expect(window.location.pathname).toBe("/");
  });
});
