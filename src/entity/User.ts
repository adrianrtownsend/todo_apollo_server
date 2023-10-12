import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import {
	Contains,
	IsInt,
	Length,
	IsEmail,
	IsFQDN,
	IsDate,
	MinLength,
	MaxLength,
} from 'class-validator';
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
	@IsEmail()
	email: string;

	@Column()
	@MinLength(6, { message: 'Password must be more than 6 characters' })
	@MaxLength(20, { message: 'Password must not exceed 20 characters' })
	password: string;

	@Column()
	isPrivate: boolean;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];

	@ManyToMany(() => User, (user) => user.following)
	@JoinTable({
		name: 'user_following',
		joinColumn: { name: 'userId' },
		inverseJoinColumn: { name: 'followingId' },
	})
	followers: User[];

	@ManyToMany(() => User, (user) => user.followers)
	following: User[];
}
