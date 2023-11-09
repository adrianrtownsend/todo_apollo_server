import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	isVisible: boolean;
}
