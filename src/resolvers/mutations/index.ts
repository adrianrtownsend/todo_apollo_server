import repositories from '../../repositories/index.js';
import { PubSub } from 'graphql-subscriptions';
import {
	MutationCreateTodoArgs,
	MutationCreateUserArgs,
} from '../../types/graphql.js';

const pubsub = new PubSub();

const mutations = {
	createUser: async (
		_: any,
		{
			username,
			email,
			firstName,
			lastName,
			password,
			isPrivate = false,
		}: MutationCreateUserArgs
	) => {
		const user = repositories.userRepository.create({
			username,
			email,
			firstName,
			lastName,
			password,
			isPrivate,
		});
		await repositories.userRepository.save(user);
		return user;
	},
	updateUser: async (
		_: any,
		{ id, username, email, firstName, lastName, password, isPrivate }
	) => {
		const user = await repositories.userRepository.findOneBy({ id });

		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}

		return repositories.userRepository.update(user.id, {
			username: username ?? user.username,
			email: email ?? user.email,
			firstName: firstName ?? user.firstName,
			lastName: lastName ?? user.lastName,
			password: password ?? user.password,
			isPrivate: isPrivate ?? user.isPrivate,
		});
	},
	deleteUser: async (_: any, { id }) => {
		await repositories.userRepository.delete(id);
	},
	createTodo: async (_: any, { title, userId }: MutationCreateTodoArgs) => {
		const user = await repositories.userRepository.findOneBy({ id: userId });

		if (!user) {
			throw new Error(`User with ID ${userId} not found`);
		}

		const todo = repositories.todoRepository.create({
			title,
			isCompleted: false,
			user,
		});
		await repositories.todoRepository.save(todo);

		// Publish a subscription event
		pubsub.publish('TODO_CREATED', { todoCreated: todo });

		return todo;
	},
	updateTodo: async (_: any, { id, title, description, isCompleted }) => {
		const todo = await repositories.todoRepository.findOneBy({ id });

		if (!todo) {
			throw new Error(`Todo with ID ${id} not found`);
		}

		return repositories.todoRepository.update(todo.id, {
			title: title ?? todo.title,
			description: description ?? todo.description,
			isCompleted: isCompleted ?? todo.isCompleted,
		});
	},
	deleteTodo: async (_: any, { id }) => {
		await repositories.todoRepository.delete(id);
	},
	createTag: async (_: any, { name, isVisible = false }) => {
		const tag = repositories.tagRepository.create({
			name,
			isVisible,
		});
		await repositories.tagRepository.save(tag);
		return tag;
	},
	updateTag: async (_: any, { id, name, isVisible }) => {
		const tag = await repositories.tagRepository.findOneBy({ id });

		if (!tag) {
			throw new Error(`Tag with ID ${id} not found`);
		}

		return repositories.tagRepository.update(tag.id, {
			name: name ?? tag.name,
			isVisible: isVisible ?? tag.isVisible,
		});
	},
	deleteTag: async (_: any, { id }) => {
		await repositories.tagRepository.delete(id);
	},
};

export default mutations;
