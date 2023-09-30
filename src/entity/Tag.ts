import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	visible: boolean;
}
