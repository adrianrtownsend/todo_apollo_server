import repositories from '../../repositories/index.js';

const tagMutations = {
	createTag: async (_: any, { name, visible }) => {
		const tag = repositories.tagRepository.create({
			name,
			visible,
		});
		await repositories.tagRepository.save(tag);
		return tag;
	},
	deleteTag: async (_: any, { id }) => {
		await repositories.tagRepository.delete(id);
	},
};

export default tagMutations;
