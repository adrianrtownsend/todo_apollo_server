import repositories from '../../repositories/index.js';

const tagQueries = {
	getTags: async () => {
		return repositories.tagRepository.find();
	},
	getTagById: async () => {},
};
