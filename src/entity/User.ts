import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './Todo.js';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	visible: boolean;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];
}
