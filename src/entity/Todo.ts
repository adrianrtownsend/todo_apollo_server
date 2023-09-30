import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	completed: boolean;

	@ManyToOne(() => User, (user) => user.todos)
	user: User;
}
