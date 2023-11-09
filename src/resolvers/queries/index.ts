import repositories from '../../repositories/index.js';

const queries = {
	todos: async (_: any) => {
		return repositories.todoRepository.find();
	},
	todo: async (_: any, { id }: { id: number }) => {
		return repositories.todoRepository.findOneBy({ id });
	},
	todosByUserId: async (_: any, { userId }: { userId: string }) => {
		return repositories.todoRepository.findBy({ userId });
	},
	tags: async (_: any) => {
		return repositories.tagRepository.find();
	},
	tag: async (_: any, { id }: { id: number }) => {
		return repositories.tagRepository.findOneBy({ id });
	},
};

export default queries;
