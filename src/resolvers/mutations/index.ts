import repositories from '../../repositories/index.js';
import { MutationCreateTodoArgs } from '../../types/graphql.js';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const mutations = {
	createTodo: async (
		_: any,
		{ title, description, isCompleted = false }: MutationCreateTodoArgs,
		ctx
	) => {
		const todo = repositories.todoRepository.create({
			title,
			description,
			isCompleted,
			userId: ctx.uid,
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

		if (todo.userId !== ctx.uid) {
			throw new Error(`Unauthorized to complete this action`);
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
