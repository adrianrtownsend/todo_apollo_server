import {
	createCustomToken,
	createUser,
	deleteUser,
	updateUser,
} from '../../firebase/index.js';
import repositories from '../../repositories/index.js';
import {
	MutationCreateTodoArgs,
	MutationCreateUserArgs,
} from '../../types/graphql.js';
import { PubSub } from 'graphql-subscriptions';
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
		try {
			await repositories.userRepository.save(user);
			const googleUser = await createUser({
				...user,
				displayName: user.username,
			});
			await repositories.userRepository.update(user.id, {
				auth_firebase_uid: googleUser.uid,
			});
			return createCustomToken(googleUser.uid);
		} catch (error) {
			console.log('error: ', error);
			throw error;
		}
	},
	updateUser: async (_: any, args, ctx) => {
		const { id, username, email, firstName, lastName, password, isPrivate } =
			args;
		const user = await repositories.userRepository.findOneBy({ id });

		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}
		try {
			await repositories.userRepository.update(user.id, {
				username: username ?? user.username,
				email: email ?? user.email,
				firstName: firstName ?? user.firstName,
				lastName: lastName ?? user.lastName,
				password: password ?? user.password,
				isPrivate: isPrivate ?? user.isPrivate,
			});
			if (user.auth_firebase_uid) {
				await updateUser(user.auth_firebase_uid, args);
			}
			return user;
		} catch (error) {
			console.log('error: ', error);
			throw error;
		}
	},
	deleteUser: async (_: any, { id }, ctx) => {
		try {
			const user = await repositories.userRepository.findOneBy({ id });
			if (!user) {
				throw new Error(`User with id: ${id} not found`);
			}
			await repositories.userRepository.delete(id);
			if (user.auth_firebase_uid) {
				await deleteUser(user.auth_firebase_uid);
			}
			return user;
		} catch (error) {
			console.log('error: ', error);
			throw error;
		}
	},
	createTodo: async (
		_: any,
		{ title, userId }: MutationCreateTodoArgs,
		ctx
	) => {
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
	updateTodo: async (_: any, { id, title, description, isCompleted }, ctx) => {
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
	deleteTodo: async (_: any, { id }, ctx) => {
		const todo = await repositories.todoRepository.findOneBy({ id });
		if (!todo) {
			throw new Error(`Cannot find todo with id ${id}`);
		}
		await repositories.todoRepository.delete(id);
		return todo;
	},
	createTag: async (_: any, { name, isVisible = false }, ctx) => {
		const tag = repositories.tagRepository.create({
			name,
			isVisible,
		});
		await repositories.tagRepository.save(tag);
		return tag;
	},
	updateTag: async (_: any, { id, name, isVisible }, ctx) => {
		const tag = await repositories.tagRepository.findOneBy({ id });

		if (!tag) {
			throw new Error(`Tag with ID ${id} not found`);
		}

		return repositories.tagRepository.update(tag.id, {
			name: name ?? tag.name,
			isVisible: isVisible ?? tag.isVisible,
		});
	},
	deleteTag: async (_: any, { id }, ctx) => {
		const tag = await repositories.tagRepository.findOneBy({ id });
		if (!tag) {
			throw new Error(`Tag with ID ${id} not found`);
		}
		await repositories.tagRepository.delete(id);
		return tag;
	},
};

export default mutations;
