/**
 * Application routes
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const app = require('../app');
const clientRouter = require('./clientRouter');

app.use('/api/v1/clients', clientRouter);
// app.use('/api/v1/transactions', transactionRouter);
