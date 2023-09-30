import repositories from '../../repositories/index.js';
import { MutationCreateUserArgs } from '../../types/graphql.js';

const userMutations = {
	createUser: async (
		_: any,
		{ username, email, firstName, lastName, password }: MutationCreateUserArgs
	) => {
		const user = repositories.userRepository.create({
			username,
			email,
			lastName,
			firstName,
			password,
		});
		await repositories.userRepository.save(user);
		return user;
	},
	deleteUSer: async (_: any, { id }) => {
		await repositories.userRepository.delete(id);
	},
};

export default userMutations;
