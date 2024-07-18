import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";

describe("Layout component", () => {
  it("should render Appbar and Outlet components", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<div>Outlet Mock</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByAltText("Logo Meli")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar productos, marcas y más...")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Buscar")).toBeInTheDocument();

    // Check if the Outlet content is rendered
    expect(screen.getByText("Outlet Mock")).toBeInTheDocument();
  });
});
