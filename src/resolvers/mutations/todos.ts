import repositories from '../../repositories/index.js';
import { PubSub } from 'graphql-subscriptions';
import { MutationCreateTodoArgs } from '../../types/graphql.js';

const pubsub = new PubSub();

const todoMutations = {
	createTodo: async (
		_: any,
		{ title, completed, userId }: MutationCreateTodoArgs
	) => {
		const user = await repositories.userRepository.findOneBy({ id: userId });

		if (!user) {
			throw new Error(`User with ID ${userId} not found`);
		}

		const todo = repositories.todoRepository.create({ title, completed, user });
		await repositories.todoRepository.save(todo);

		// Publish a subscription event
		pubsub.publish('TODO_CREATED', { todoCreated: todo });

		return todo;
	},
	deleteTodo: async (_: any, { id }) => {
		await repositories.todoRepository.delete(id);
	},
};

export default todoMutations;
