const graphql = require('graphql');
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
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    clientId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    type: { type: GraphQLString },
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
      },
      resolve(parent, args) {
        let query = Client.find({});
        query = query.sort('name');

        const page = args.page >> 0 || 1;
        const limit = args.limit >> 0 || 20;
        const skip = Math.max(0, page - 1) * limit;

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
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
