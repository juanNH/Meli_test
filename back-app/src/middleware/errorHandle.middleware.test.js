const express = require("express");
const request = require("supertest");
const { errorHandler, HttpError } = require("./errorHandler.middleware"); // Ajusta la ruta

const app = express();

// Middleware para probar el errorHandler
app.use(express.json());

// Endpoint para simular un error
app.get("/error", (req, res, next) => {
  next(new Error("Simulated server error"));
});

// Endpoint para simular un HttpError
app.get("/http-error", (req, res, next) => {
  next(new HttpError(400, "Bad Request"));
});

// Middleware de manejo de errores
app.use(errorHandler);

describe("Error Handler Middleware", () => {
  let consoleErrorSpy;

  beforeAll(() => {
    // Espiar console.error y silenciarlo temporalmente
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    // Restaurar console.error después de las pruebas
    consoleErrorSpy.mockRestore();
  });
  it('should return 500 and "Server Error" message for general errors', async () => {
    /*   global.console = {
        ...console,
        error: jest.fn(),
      }; */
    const response = await request(app).get("/error");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Server Error",
      message: "Simulated server error",
    });
  });

  it("should return specific status code and message for HttpError", async () => {
    /*  global.console = {
        ...console,
        error: jest.fn(),
      }; */
    const response = await request(app).get("/http-error");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Bad Request",
    });
  });
});
