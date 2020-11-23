/**
 * API Controller for handling requested data and generating proper responses
 * @author <Sajeeb Ahamed> sajeeb07ahamed@gmail.com
 * @copyright MIT
 */
const Client = require('../models/clientsModel');

const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        client,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    const results = await Client.countDocuments({});
    res.status(200).json({
      status: 'success',
      results,
      data: {
        clients,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

const getClient = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      clients: ['sajeeb', 'ahamed'],
    },
  });
};

const updateClient = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      clients: ['sajeeb', 'ahamed'],
    },
  });
};

const deleteClient = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      clients: ['sajeeb', 'ahamed'],
    },
  });
};

module.exports = {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
