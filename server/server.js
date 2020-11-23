/**
 * Application Server.
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const dotenv = require('dotenv');

/** Pull dotenv configuration */
dotenv.config();

/**
 * Import app and database and the routes
 */
const app = require('./app');
const database = require('./database');

/** Currently I am using GraphQL instead of HTTP requests */
// require('./routes');

/**
 * Connect to the mongoDB.
 * The connection is established with the mongoDB cloud
 */
database.connect();

/**
 * Start listening the express server
 */
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
