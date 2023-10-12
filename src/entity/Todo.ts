import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
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
	isCompleted: boolean;

	@ManyToOne(() => User, (user) => user.todos, {
		cascade: true,
	})
	@JoinColumn()
	user: User;
}
