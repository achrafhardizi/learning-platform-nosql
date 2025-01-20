const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini API for Managing Courses and Students in MongoDb Atlas',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation and MongoDb and Redids cache',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};