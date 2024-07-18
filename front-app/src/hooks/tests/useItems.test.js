import { useItems } from "./../useItems";
import { renderHook, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("useItems Hook", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const wrapper = ({ children }) => (
    <MemoryRouter initialEntries={["/items?search=pelota"]}>
      {children}
    </MemoryRouter>
  );

  it("should fetch item data correctly", async () => {
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
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useItems(), { wrapper });
      result = hookResult;
    });
    expect(result.current.items).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle fetch errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Fetch error"));

    let result;
    const { result: hookResult } = renderHook(() => useItems(), { wrapper });
    result = hookResult;

    expect(result.current.item).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error to get items from Server API")
      );
    });
  });

  it("should handle JSON parse errors", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error("JSON parse error")),
    });

    const { result } = renderHook(() => useItems(), { wrapper });

    expect(result.current.item).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error to parse data to json")
      );
    });
  });
});
