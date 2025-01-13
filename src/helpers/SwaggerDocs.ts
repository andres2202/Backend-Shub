import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Backend API SHUB",
        version: "1.0.0",
        description: "API using Express and TypeScript",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
  }

  const specs = swaggerJsdoc(options);

  function swaggerDocs(app: Express, port: number): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    console.log(`Docs available at http://localhost:${port}/api-docs`);

  }

  export default swaggerDocs;