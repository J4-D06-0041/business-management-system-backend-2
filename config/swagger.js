const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Business Management System API',
      version: '1.0.0',
      description: 'API documentation for Business Management System',
    },
    servers: [
      {
        url: 'http://localhost:5050',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
  },
  apis: ['./routes/*.js'], // looks for annotations in your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;