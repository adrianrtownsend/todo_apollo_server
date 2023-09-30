import repositories from '../repositories/index.js';

export const seedDatabase = async () => {
	try {
		// Seed users
		const users = await repositories.userRepository.save([
			{
				username: 'user1',
				email: 'user1@example.com',
				firstName: 'Jane',
				lastName: 'Doe',
				password: 'password1',
			},
			{
				username: 'user2',
				email: 'user2@example.com',
				firstName: 'John',
				lastName: 'Jones',
				password: 'password2',
			},
			// Add more users as needed
		]);

		// Seed todos
		await repositories.todoRepository.save([
			{ title: 'Task 1', completed: false, user: users[0] },
			{ title: 'Task 2', completed: true, user: users[0] },
			{ title: 'Task 3', completed: false, user: users[1] },
			// Add more todos as needed
		]);

		console.log('Database seeded with sample data.');
	} catch (error) {
		console.error('Error seeding the database:', error);
	}
};
