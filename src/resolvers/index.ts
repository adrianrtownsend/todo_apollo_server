import queries from './queries/index.js';
import { Resolvers } from '../types/graphql.js';
import subscriptions from './subscriptions/index.js';
import mutations from './mutations/index.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: queries,
	Mutation: mutations,
	Subscription: subscriptions,
};

export default resolvers;
