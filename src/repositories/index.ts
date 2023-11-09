import { AppDataSource } from '../data-source.js';
import { Todo } from '../entity/Todo.js';
import { Tag } from '../entity/Tag.js';

const repositories = {
	todoRepository: AppDataSource.getRepository(Todo),
	tagRepository: AppDataSource.getRepository(Tag),
};

export default repositories;
