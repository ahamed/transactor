const { startOfDay, endOfDay } = require('date-fns');
const graphql = require('graphql');
const ISODate = require('graphql-iso-date');
const { format } = require('date-fns');

const { Types } = require('mongoose');
const Client = require('../models/clientsModel');
const Transaction = require('../models/transactionModel');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = graphql;

const { GraphQLDateTime } = ISODate;

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    mobile: { type: GraphQLString },
    avatar: { type: GraphQLString },
    address: { type: GraphQLString },
    note: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args) {
        let query = Transaction.find({ clientId: parent.id });
        query = query.sort('-createdAt');

        return query;
      },
    },
    balance: {
      type: GraphQLInt,
      async resolve(parent, args) {
        /**
         * Group the amount by transaction type i.e. incoming/outgoing
         */
        const balance = await Transaction.aggregate([
          {
            $match: {
              clientId: Types.ObjectId(parent.id),
            },
          },
          {
            $group: {
              _id: '$type',
              bal: { $sum: '$amount' },
            },
          },
        ]);

        let incoming = 0;
        let outgoing = 0;

        if (balance && balance.length > 0) {
          balance.forEach(({ _id, bal }) => {
            if (_id === 'incoming') incoming = bal;
            else outgoing = bal;
          });
        }

        return incoming - outgoing;
      },
    },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    clientId: { type: GraphQLID },
    createdAt: {
      type: GraphQLDateTime,
    },
    type: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        filter: { type: GraphQLString },
        createdAt: { type: GraphQLDateTime },
        type: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let query = null;
        let _ids = [];

        /**
         * If need to query transactions by type
         */
        const conditions = {};
        if (args.type) {
          conditions.type = args.type;
        }

        /**
         * If need to filter the transactions by its created date
         */
        if (args.createdAt) {
          conditions.createdAt = {
            $gte: startOfDay(args.createdAt),
            $lte: endOfDay(args.createdAt),
          };
        }

        if (Object.keys(conditions).length > 0) {
          let transaction = Transaction.find(conditions);
          transaction = transaction.select('clientId');
          const clientIds = await transaction.exec();

          _ids = clientIds ? clientIds.map((item) => item.clientId) : [];
        }

        if (_ids.length > 0) {
          query = Client.find({ _id: { $in: _ids } });
        } else if (Object.keys(conditions).length > 0 && _ids.length === 0) {
          query = Client.find({ name: '-100-103849730-4939843' }); // some invalid name
        } else {
          query = Client.find({});
        }

        query = query.sort('name');

        const page = args.page >> 0 || 1;
        const limit = args.limit >> 0 || 20;
        const skip = Math.max(0, page - 1) * limit;

        /**
         * Filter clients by name
         */
        if (args.filter) {
          const regex = new RegExp(args.filter, 'ig');
          query = query.find({ name: regex });
        }

        query = query.skip(skip).limit(limit);

        return query;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      args: {
        createdAt: { type: GraphQLDateTime },
        type: { type: GraphQLString },
      },
      resolve(parent, args) {
        let query = Transaction.find({});

        if (args.createdAt) {
          query = query.find({
            createdAt: {
              $gte: startOfDay(args.createdAt),
              $lte: endOfDay(args.createdAt),
            },
          });
        }

        if (args.type) {
          query = query.find({ type: args.type });
        }

        query = query.sort('-createdAt');

        return query;
      },
    },
    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Transaction.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        mobile: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLString },
        address: { type: GraphQLString },
        note: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Client.create(args);
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        mobile: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLString },
        address: { type: GraphQLString },
        note: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
    addTransaction: {
      type: TransactionType,
      args: {
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Transaction.create(args);
      },
    },
    updateTransaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID }, amount: { type: GraphQLInt } },
      resolve(parent, args) {
        const data = { amount: args.amount };
        return Transaction.findByIdAndUpdate(args.id, data);
      },
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Transaction.findOneAndDelete({ _id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
