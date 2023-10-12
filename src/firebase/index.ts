import admin from 'firebase-admin';
import serviceAccount from '../../firebase-admin.config.json' assert { type: 'json' };

const { auth } = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

interface ICreateUserArgs {
	email: string;
	emailVerified: boolean;
	phoneNumber: string;
	password: string;
	displayName: string;
	photoURL?: string;
	disabled: boolean;
}

interface IUpdateUserArgs {
	email?: string;
	phoneNumber?: string;
	emailVerified?: boolean;
	password?: string;
	displayName?: string | null;
	photoURL?: string | null;
	disabled?: boolean;
}

export const getUser = (uid: string) => {
	auth()
		.getUser(uid)
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
			return userRecord;
		})
		.catch((error) => {
			console.log('Error fetching user data:', error);
		});
};

export const getUsers = () => {};

export const getUserByEmail = (email: string) => {
	auth()
		.getUserByEmail(email)
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
			return userRecord;
		})
		.catch((error) => {
			console.log('Error fetching user data:', error);
		});
};

export const createUser = ({
	email,
	emailVerified = false,
	phoneNumber,
	password,
	displayName,
	photoURL = '',
	disabled = false,
}: ICreateUserArgs) => {
	auth()
		.createUser({
			email,
			emailVerified,
			phoneNumber,
			password,
			displayName,
			photoURL,
			disabled,
		})
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log('Successfully created new user:', userRecord.uid);
			return userRecord;
		})
		.catch((error) => {
			console.log('Error creating new user:', error);
		});
};

export const updateUser = () => {
	// lookup user
	// update user
};

export const deleteUser = (uid: string) => {
	auth()
		.deleteUser(uid)
		.then(() => {
			console.log('Successfully deleted user');
		})
		.catch((error) => {
			console.log('Error deleting user:', error);
		});
};

export const deleteUsers = (uids: string[]) => {
	auth()
		.deleteUsers(uids)
		.then((deleteUsersResult) => {
			if (!deleteUsersResult.successCount) {
				console.log(`No users deleted`);
			}

			if (deleteUsersResult.successCount) {
				console.log(
					`Successfully deleted ${deleteUsersResult.successCount} users`
				);
			}

			if (!deleteUsersResult.failureCount) {
				console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
				deleteUsersResult.errors.forEach((err) => {
					console.log(err.error.toJSON());
				});
			}
		})
		.catch((error) => {
			console.log('Error deleting users:', error);
		});
};
