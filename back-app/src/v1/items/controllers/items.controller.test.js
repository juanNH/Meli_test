const request = require("supertest");
const express = require("express");
const app = express();
const {
  errorHandler,
  HttpError,
} = require("../../../middleware/errorHandler.middleware");

// Importar los controladores
const { getItemById, getItems } = require("./items.controller");

// Mockear ItemsService y ItemRepository
jest.mock("./../services/Items.service");
const ItemsService = require("../services/Items.service");

jest.mock("./../repositories/items.repository");
const ItemRepository = require("../repositories/items.repository");

// Crear instancia de ItemsService con un repositorio mockeado
const itemRepository = new ItemRepository();
const itemsService = new ItemsService(itemRepository);

// Configurar middleware de test
app.use(express.json());
app.use((req, res, next) => {
  req.author = { name: "Juan", lastname: "Herrera" }; // Mock de datos de autor
  next();
});
app.get("/items", getItems);
app.get("/items/:id", getItemById);
app.use(errorHandler);
describe("Items Controller", () => {
  let consoleErrorSpy;

  beforeAll(() => {
    // Espiar console.error y silenciarlo temporalmente
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    // Restaurar console.error después de las pruebas
    consoleErrorSpy.mockRestore();
  });
  describe("GET /items", () => {
    it("should return items response", async () => {
      const mockResponse = {
        author: { name: "Juan", lastname: "Herrera" },
        items: [
          {
            id: "123",
            title: "Item Title",
            price: { currency: "USD", amount: 100, decimals: 0 },
            picture: "http://example.com/image.jpg",
            condition: "new",
            free_shipping: true,
          },
        ],
        categories: ["Category 1", "Category 2"],
      };

      ItemsService.prototype.getItems.mockResolvedValue(mockResponse);

      const response = await request(app).get("/items?q=test");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should handle errors", async () => {
      ItemsService.prototype.getItems.mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/items?q=test");
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Service error");
    });
  });

  describe("GET /items/:id", () => {
    it("should return item detail response", async () => {
      const mockResponse = {
        item: {
          id: "123",
          title: "Item Title",
          price: { currency: "USD", amount: 100, decimals: 0 },
          picture: "http://example.com/image.jpg",
          condition: "new",
          free_shipping: true,
          sold_quantity: 10,
          description: "Item description",
        },
        author: { name: "Juan", lastname: "Herrera" },
      };

      ItemsService.prototype.getItemById.mockResolvedValue(mockResponse);

      const response = await request(app).get("/items/123");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should handle item not found", async () => {
      ItemsService.prototype.getItemById.mockRejectedValue(
        new HttpError(404, "Item not found")
      );

      const response = await request(app).get("/items/123");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Item not found");
    });

    it("should handle errors", async () => {
      ItemsService.prototype.getItemById.mockRejectedValue(
        new Error("Service error")
      );

      const response = await request(app).get("/items/123");
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Service error");
    });
  });
});
