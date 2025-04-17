const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RespondeAI Quiz Service",
      version: "1.0.0",
      description: "API para gerenciamento de quizzes da plataforma RespondeAI"
    },
    servers: [
      {
        url: "http://localhost:3003",
        description: "Servidor Local"
      }
    ]
  },
  apis: ["./src/swaggerDocs/*.js"], // Pasta onde estão as rotas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
