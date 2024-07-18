const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { errorHandler } = require("./src/middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "*", //'http://localhost:3000',
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Prueba tecnica Meli",
    version: "1.0.0",
    description: "Your API description (v1)",
  },
  basePath: "/api/v1",
  components: {
    // Define reusable schemas
    schemas: {
      ItemDetail: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          price: { type: "number" },
          picture: { type: "string" },
          condition: { type: "string" },
          free_shipping: { type: "boolean" },
          sold_quantity: { type: "integer" },
          description: { type: "string" },
          author: { $ref: "#/components/schemas/Author" }, // Reference to Author schema
        },
      },
      Item: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          price: { type: "number" },
          picture: { type: "string" },
          condition: { type: "string" },
          free_shipping: { type: "boolean" },
          author: { $ref: "#/components/schemas/Author" }, // Reference to Author schema
        },
      },
      Author: {
        type: "object",
        properties: {
          name: { type: "string" },
          lastname: { type: "string" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string" },
        }
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/v1/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(corsOptions));

const routerV1 = require("./src/v1/indexRouter");
app.use("/api/v1", routerV1);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Meli test app running on http://localhost:${port}`);
});
