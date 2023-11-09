import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './entity/Todo.js';
import { Tag } from './entity/Tag.js';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT),
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	logging: true,
	entities: [Todo, Tag],
	migrations: [],
	subscribers: [],
	synchronize: true,
});
