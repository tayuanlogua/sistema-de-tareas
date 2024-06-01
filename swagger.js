const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Especifica la ruta a tu archivo de rutas donde tienes tus comentarios JSDoc
const apiRoutesPath = path.resolve(__dirname, "routes", "index.js");

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Nombre de tu API",
      version: "1.0.0",
      description: "Descripción de tu API",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL de tu servidor
      },
    ],
  },
  apis: [apiRoutesPath], // Ruta a tus archivos de rutas donde tienes tus comentarios JSDoc
};

// Generar la documentación de Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware para servir la documentación de Swagger
const serveSwagger = swaggerUi.setup(swaggerSpec);

// Exporta el middleware de Swagger
module.exports = serveSwagger;
