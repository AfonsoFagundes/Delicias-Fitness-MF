import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Marmitas",
      version: "1.0.0",
      description: "Documentação da API"
    }
  },
  apis: [path.resolve(__dirname, "../routes/*.ts")]
};

export const swaggerSpec = swaggerJsdoc(options);