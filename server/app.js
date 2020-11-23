/**
 * Express Application.
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();

/**
 * Use middlewares for the application.
 * 1. Express should accept JSON requests.
 * 2. CORS need to be enabled for cross server requests.
 * 3. Attach graphql endpoint with schema.
 */
app.use(express.json());
app.use(cors());
app.use(
  '/api/v1/terminal',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

if (process.env.ENV_MODE === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
