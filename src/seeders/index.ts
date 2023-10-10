import repositories from '../repositories/index.js';

export const seedDatabase = async () => {
	// empty tables
	try {
		// empty tags
		await repositories.tagRepository.clear();
		// empty todos
		await repositories.todoRepository.clear();
		// empty users
		await repositories.userRepository.clear();
	} catch (error) {
		console.error('Error empyting databse: ', error);
	}

	try {
		// Seed users
		const users = await repositories.userRepository.save([
			{
				username: 'user1',
				email: 'user1@example.com',
				firstName: 'Jane',
				lastName: 'Doe',
				password: 'password1',
				isPrivate: false,
			},
			{
				username: 'user2',
				email: 'user2@example.com',
				firstName: 'John',
				lastName: 'Jones',
				password: 'password2',
				isPrivate: false,
			},
			{
				username: 'user3',
				email: 'user3@example.com',
				firstName: 'Sam',
				lastName: 'Smith',
				password: 'password3',
				isPrivate: false,
			},
			{
				username: 'user4',
				email: 'user4@example.com',
				firstName: 'Don',
				lastName: 'Julio',
				password: 'password4',
				isPrivate: false,
			},
		]);

		// Seed todos
		await repositories.todoRepository.save([
			{
				title: 'Task 1',
				isCompleted: false,
				user: users[0],
				description: 'A task description',
			},
			{
				title: 'Task 2',
				isCompleted: true,
				user: users[0],
				description: 'A task description',
			},
			{
				title: 'Task 3',
				isCompleted: false,
				user: users[1],
				description: 'A task description',
			},
			{
				title: 'Task 1',
				isCompleted: false,
				user: users[3],
				description: 'A task description',
			},
			{
				title: 'Task 2',
				isCompleted: true,
				user: users[0],
				description: 'A task description',
			},
			{
				title: 'Task 3',
				isCompleted: false,
				user: users[2],
				description: 'A task description',
			},
			// Add more todos as needed
		]);

		console.log('Database seeded with sample data.');
	} catch (error) {
		console.error('Error seeding the database:', error);
	}
};
