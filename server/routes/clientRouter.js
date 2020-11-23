/**
 * Client Router
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */

const express = require('express');
const {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

const router = express.Router();

router.route('/').get(getClients).post(createClient);
router.route('/:id').get(getClient).patch(updateClient).delete(deleteClient);

module.exports = router;
