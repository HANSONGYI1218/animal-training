// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the version of OpenAPI
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation for my Next.js App",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // Adjust based on your server URL
      },
    ],
  },
  apis: ["./pages/api/**/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
