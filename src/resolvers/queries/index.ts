// import { connection } from '../../index.js';
import repositories from '../../repositories/index.js';

const queries = {
	users: async () => {
		return repositories.userRepository.find();
	},
	user: async (_: any, { id }: { id: number }) => {
		return repositories.userRepository.findOneBy({ id });
	},
	todos: async () => {
		return repositories.todoRepository.find();
	},
	todo: async (_: any, { id }: { id: number }) => {
		return repositories.todoRepository.findOneBy({ id });
	},
	todosByUserId: async (_: any, { userId }: { userId: number }) => {
		return repositories.todoRepository.findBy({ id: userId });
	},
	tags: async () => {
		return repositories.tagRepository.find();
	},
	tag: async (_: any, { id }: { id: number }) => {
		return repositories.tagRepository.findOneBy({ id });
	},
};

export default queries;
