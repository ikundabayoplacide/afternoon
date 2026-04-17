import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AfterNoon API",
      version: "1.0.0",
      description: "API documentation for AfterNoon project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterBody: {
          type: "object",
          required: ["fullName", "email", "password", "phoneNumber", "location", "gender"],
          properties: {
            fullName: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "secret123" },
            phoneNumber: { type: "string", example: "+1234567890" },
            location: { type: "string", example: "Kigali" },
            gender: { type: "string", enum: ["male", "female", "others"] },
            age: { type: "integer", example: 25 },
            date_of_birth: { type: "string", format: "date", example: "1999-01-01" },
            type: { type: "string", enum: ["admin", "customer", "seller", "delivery"], default: "customer" },
          },
        },
        LoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        UserBody: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            phoneNumber: { type: "string" },
            location: { type: "string" },
            gender: { type: "string", enum: ["male", "female", "others"] },
            age: { type: "integer" },
            date_of_birth: { type: "string", format: "date" },
            type: { type: "string", enum: ["admin", "customer", "seller", "delivery"] },
          },
        },
      },
    },
    paths: {
      "/api/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/RegisterBody" } },
            },
          },
          responses: {
            201: { description: "User created successfully" },
            404: { description: "User already exists" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/login": {
        post: {
          tags: ["Auth"],
          summary: "Login and get JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LoginBody" } },
            },
          },
          responses: {
            200: { description: "Login successful, returns token" },
            401: { description: "Invalid credentials" },
            404: { description: "User not found" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/getAllUsers": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of all users" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/createSystemUser": {
        post: {
          tags: ["Users"],
          summary: "Create a new system user",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/RegisterBody" } },
            },
          },
          responses: {
            201: { description: "User created successfully" },
            400: { description: "User already exists" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/getSingleUser/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get a single user by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "User found" },
            404: { description: "User not found" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/updateUser/{id}": {
        put: {
          tags: ["Users"],
          summary: "Update a user by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/UserBody" } },
            },
          },
          responses: {
            200: { description: "User updated successfully" },
            404: { description: "User not found" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/deleteUser/{id}": {
        delete: {
          tags: ["Users"],
          summary: "Delete a user by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "User deleted successfully" },
            404: { description: "User not found" },
            500: { description: "Server error" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
