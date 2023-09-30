import { AppDataSource } from '../data-source.js';
import { Todo } from '../entity/Todo.js';
import { User } from '../entity/User.js';
import { Tag } from '../entity/Tag.js';

const repositories = {
	userRepository: AppDataSource.getRepository(User),
	todoRepository: AppDataSource.getRepository(Todo),
	tagRepository: AppDataSource.getRepository(Tag),
};

export default repositories;
