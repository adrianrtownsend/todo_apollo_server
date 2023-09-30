// import { connection } from '../../index.js';
import repositories from '../../repositories/index.js';

const queries = {
	getUsers: async () => {
		return repositories.userRepository.find();
	},
	getUserById: async (_: any, { id }: { id: number }) => {
		return repositories.userRepository.findOneBy({ id: id });
	},
	getTodos: async () => {
		return repositories.todoRepository.find();
	},
	getTodosByUserId: async (_: any, { userId }: { userId: number }) => {
		return repositories.todoRepository.findBy({ id: userId });
	},
	getTags: async () => {
		return repositories.tagRepository.find();
	},
	// getUsersRaw: async () => {
	// 	const [rows, fields] = await connection.query(`SELECT * FROM user`);
	// 	return rows;
	// },
	// getTodosRaw: async () => {
	// 	const [rows, fields] = await connection.query(`SELECT * FROM Todo`);
	// 	return rows;
	// },
};

export default queries;
