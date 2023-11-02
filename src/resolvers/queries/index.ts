import repositories from '../../repositories/index.js';

const queries = {
	users: async (_: any) => {
		return repositories.userRepository.find();
	},
	user: async (_: any, { id }: { id: number }) => {
		return repositories.userRepository.findOneBy({ id });
	},
	todos: async (_: any) => {
		return repositories.todoRepository.find();
	},
	todo: async (_: any, { id }: { id: number }) => {
		return repositories.todoRepository.findOneBy({ id });
	},
	todosByUserId: async (_: any, { userId }: { userId: number }) => {
		return repositories.todoRepository.findBy({ id: userId });
	},
	tags: async (_: any) => {
		return repositories.tagRepository.find();
	},
	tag: async (_: any, { id }: { id: number }) => {
		return repositories.tagRepository.findOneBy({ id });
	},
};

export default queries;
