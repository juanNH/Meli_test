import React from "react";
import { render, screen } from "@testing-library/react";
import PageItems from "./PageItems";
import { useItems } from "./../../hooks";
import { MemoryRouter } from "react-router-dom";

// Mock del hook useItems
jest.mock("../../hooks");

describe("PageItems Component", () => {
  const wrapper = ({ children }) => (
    <MemoryRouter initialEntries={["/items?search=pelota"]}>
      {children}
    </MemoryRouter>
  );
  it("should render loading state initially", async () => {
    useItems.mockReturnValue({
      items: undefined,
      isLoading: true,
    });
    render(<PageItems />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(4);
  });

   it("should render items correctly", async () => {
    const mockResponse = {
      author: {
        name: "Juan",
        lastname: "Herrera",
      },
      categories: [
        "Juegos y Juguetes",
        "Fútbol",
        "Animales y Mascotas",
        "Hogar, Muebles y Jardín",
        "Tenis, Pádel y Squash",
        "Básquet",
        "Fitness y Musculación",
        "Juegos de Salón",
        "Pilates y Yoga",
        "Ropa y Accesorios",
        "Voley",
        "Bebés",
        "Libros, Revistas y Comics",
        "Souvenirs, Cotillón y Fiestas",
        "Golf",
        "Ciclismo",
        "Handball",
        "Joyas y Relojes",
        "Rugby",
        "Softball y Beisbol",
        "Industrias y Oficinas",
        "Música, Películas y Series",
        "Arte, Librería y Mercería",
        "Salud y Equipamiento Médico",
        "Antigüedades y Colecciones",
        "Accesorios para Vehículos",
        "Consolas y Videojuegos",
        "Camping, Caza y Pesca",
        "Suplementos y Shakers",
        "Artes Marciales y Boxeo",
        "Fútbol Americano",
        "Hockey",
        "Alimentos y Bebidas",
        "Computación",
        "Celulares y Teléfonos",
        "Otras categorías",
        "Construcción",
        "Belleza y Cuidado Personal",
        "Buceo",
        "Herramientas",
        "Instrumentos Musicales",
        "Natación",
        "Otros",
      ],
      items: [
        {
          id: "MLA1481612638",
          title: "Pelota Penalty De Futbol Cosida A Mano",
          price: {
            currency: "ARS",
            amount: 29999,
            decimals: 0,
          },
          picture:
            "http://http2.mlstatic.com/D_988444-MLA71257997516_082023-I.jpg",
          condition: "Nuevo",
          free_shipping: true,
        },
        {
          id: "MLA1479681094",
          title:
            "Pelota Munich Rixter Futsal Termosellada Medio Pique Color Celeste",
          price: {
            currency: "ARS",
            amount: 36890,
            decimals: 0,
          },
          picture:
            "http://http2.mlstatic.com/D_647877-MLU72637506081_112023-I.jpg",
          condition: "Nuevo",
          free_shipping: true,
        },
        {
          id: "MLA1745020620",
          title: "Pelota Yoga Esferodinamia Gmp 75cm Pilates Color Azul",
          price: {
            currency: "ARS",
            amount: 16997,
            decimals: 0,
          },
          picture:
            "http://http2.mlstatic.com/D_977569-MLU75716685873_042024-I.jpg",
          condition: "Nuevo",
          free_shipping: false,
        },
        {
          id: "MLA1670611082",
          title: "Pelota X 2 Futsal N° 4 Futsal Cancha 5 Medio Pique ",
          price: {
            currency: "ARS",
            amount: 65261,
            decimals: 27,
          },
          picture:
            "http://http2.mlstatic.com/D_975069-MLA52487631159_112022-I.jpg",
          condition: "Nuevo",
          free_shipping: true,
        },
      ],
    };
    useItems.mockReturnValue({
      items: mockResponse,
      isLoading: false,
    });
    const { container, queryAllByTestId } = render(<PageItems />, { wrapper });
    const skeletonItems = queryAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(0);
    const itemListContainer = container.querySelector(".product-list");
    expect(itemListContainer).toBeInTheDocument();
    expect(itemListContainer.children.length).toBe(mockResponse.items.length);

    mockResponse.categories.forEach((category) => {
      const categoryElement = screen.getByText(category);
      expect(categoryElement).toBeInTheDocument();
    });

    const separatorElements = screen.getAllByText((content, element) => {
      return content === ">" && element.classList.contains("separator");
    });
    expect(separatorElements).toHaveLength(mockResponse.categories.length - 1);
  }); 
});
