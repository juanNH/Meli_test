import { useItem } from "./../useItem";
import { renderHook, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("useItem Hook", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
  const wrapper = ({ children }) => (
    <MemoryRouter initialEntries={["/items/MLA1481612638"]}>
      {children}
    </MemoryRouter>
  );
  it("should fetch item data correctly", async () => {
    const mockResponse = {
      author: {
        name: "Juan",
        lastname: "Herrera",
      },
      item: {
        id: "MLA629108518",
        title:
          "Pelota De Pilates 24 Cm Lisa Sin Peso Gmp - Pequeña - Para Gimnasia",
        price: {
          currency: "ARS",
          amount: 5695,
          decimals: 0,
        },
        picture:
          "http://http2.mlstatic.com/D_768836-MLA41305330298_042020-O.jpg",
        condition: "Nuevo",
        free_shipping: false,
        sold_quantity: 5505,
        description:
          "GMP EQUIPAMIENTOS....Aparatos y accesorios de gimnasia. Más de 10 años de experiencia\n\nSomos Mercado Lider! Compra con tranquilidad, 100% Calificaciones Positivas!\n\n¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ \nDESCRIPCIÓN DEL PRODUCTO\n\nPelota inflable chica para pilates o gimnasia\n\nDiámetro: 24cm (aproximadamente, no son exactos, pueden ser 20cm). Si compras varias podés recibir una de 24 y otra de 20cm, no tenemos forma de enviar todas exactamente del mismo diámetro. \n\nViene desinflada, con tapón para colocar una vez inflada.\n\nPara que sea más sencillo el inflado, sólo en estas esferas pequeñas, no en las grandes de esferodinamia, sugerimos usan inflador de punta tipo aguja (no de pico, fuelle). Puede ser el de pelota de fútbol.\n\nEs de goma blanda.\n\nLisa, color rojo, gris o violeta según disponibilidad de stock (se puede elegir al costado de la publicación)\n\n\n¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ \nFACTURA A o B \nPara facturas A pasar datos de facturación por mensajería de mercado libre al momento de realizar la compra.\n\nENVÍOS POR MERCADO ENVIO FULL\nDesde el depósito de Mercado Libre en Buenos Aires a todo el país. Llega muy rápido. El costo del mismo se puede calcular abajo del precio, donde dice MercadoLibre Envíos y modificar, poniendo el Código Postal de la localidad, la cantidad de unidades y la modalidad de envío (retiro en sucursal o a domicilio).\n\nGARANTÍA:\nLa garantía no incluye costos de transporte. Se requiere presentar el ticket o factura de compra.\n\nVISITA NUESTRO ESHOP PARA VER NUESTRA AMPLIA OFERTA DE PRODUCTOS",
      },
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    let result;
    await act(async () => {
      const { result: hookResult } = renderHook(() => useItem(), { wrapper });
      result = hookResult;
    });
    expect(result.current.item).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle fetch errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Fetch error"));

    let result;
    const { result: hookResult } = renderHook(() => useItem(), { wrapper });
    result = hookResult;

    expect(result.current.item).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.item).toBeUndefined();
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

    const { result } = renderHook(() => useItem(), { wrapper });

    expect(result.current.item).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.item).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error to parse data to json")
      );
    });
  });
});
