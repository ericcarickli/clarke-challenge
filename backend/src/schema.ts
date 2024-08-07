import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import Provider from './models/Provider.js';

const ProviderType = new GraphQLObjectType({
  name: 'Provider',
  fields: () => ({
    id: { type: GraphQLID },
    clientRate: { type: GraphQLString },
    kwhCost: { type: GraphQLString },
    minimumLimit: { type: GraphQLString },
    name: { type: GraphQLString },
    state: { type: GraphQLString },
    totalClients: { type: GraphQLString },
    logoUrl: { type: GraphQLString}
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    provider: {
      type: ProviderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Provider.findById(args.id).exec();
      },
    },
    providers: {
      type: new GraphQLList(ProviderType),
      resolve(parent, args) {
        return Provider.find({}).exec();
      },
    },
    providersByMinimumLimit: {
      type: new GraphQLList(ProviderType),
      args: { minimumLimit: { type: GraphQLString } },
      resolve(parent, args) {
        try {
          const minimumLimitValue = Number(args.minimumLimit);

          return Provider.aggregate([
            {
              $addFields: {
                minimumLimitInt: {
                  $convert: {
                    input: "$minimumLimit",
                    to: "int",
                    onError: 0
                  }
                }
              }
            },
            {
              $match: {
                minimumLimitInt: { $lte: minimumLimitValue }
              }
            },
            {
              $project: {
                _id: 1,
                minimumLimit: 1,
                state: 1,
                logoUrl: 1,
                clientRate: 1,
                kwhCost: 1,
                name: 1,
                totalClients: 1
              }
            }
          ]).exec();
        } catch (error) {
          console.error('Error fetching element:', error);
          throw new Error('Failed to fetch element');
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProvider: {
      type: ProviderType,
      args: {
        clientRate: { type: GraphQLString },
        kwhCost: { type: GraphQLString },
        minimumLimit: { type: GraphQLString },
        name: { type: GraphQLString },
        state: { type: GraphQLString },
        totalClients: { type: GraphQLString },
        logoUrl: { type: GraphQLString }
      },
      resolve(parent, args) {
        try {
          const provider = new Provider({
            clientRate: args.clientRate,
            kwhCost: args.kwhCost,
            minimumLimit: args.minimumLimit,
            name: args.name,
            state: args.state,
            totalClients: args.totalClients,
            logoUrl: args.logoUrl,
          });
          return provider.save();
        } catch (error) {
          console.error('Error creating provider:', error);
          throw new Error('Failed to create provider');
        }
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
