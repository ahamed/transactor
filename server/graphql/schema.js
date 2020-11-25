const graphql = require('graphql');
const Client = require('../models/clientsModel');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
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
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find({});
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
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
