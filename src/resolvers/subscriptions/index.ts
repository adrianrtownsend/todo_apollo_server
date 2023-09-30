import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
const subscriptions = {
	todoCreated: {
		subscribe: () => pubsub.asyncIterator(['TODO_CREATED']),
	},
};

export default subscriptions;
