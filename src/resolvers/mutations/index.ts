import repositories from '../../repositories/index.js';
import { PubSub } from 'graphql-subscriptions';
import {
	MutationCreateTodoArgs,
	MutationCreateUserArgs,
	User,
} from '../../types/graphql.js';

const pubsub = new PubSub();

const mutations = {
	createUser: async (
		_: any,
		{ username, email, firstName, lastName, password }: MutationCreateUserArgs
	) => {
		const user = repositories.userRepository.create({
			username,
			email,
			firstName,
			lastName,
			password,
		});
		await repositories.userRepository.save(user);
		return user;
	},
	createTodo: async (_: any, { title, userId }: MutationCreateTodoArgs) => {
		const user = await repositories.userRepository.findOneBy({ id: userId });

		if (!user) {
			throw new Error(`User with ID ${userId} not found`);
		}

		const todo = repositories.todoRepository.create({
			title,
			completed: false,
			user,
		});
		await repositories.todoRepository.save(todo);

		// Publish a subscription event
		pubsub.publish('TODO_CREATED', { todoCreated: todo });

		return todo;
	},
	createTag: async (_: any, { name, visible }) => {
		const tag = repositories.tagRepository.create({
			name,
			visible,
		});
		await repositories.tagRepository.save(tag);
		return tag;
	},
};

export default mutations;
