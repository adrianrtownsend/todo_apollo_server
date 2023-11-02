import admin from 'firebase-admin';
import serviceAccount from '../../firebase-admin.config.json' assert { type: 'json' };
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

const { auth } = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

interface ICreateUserArgs {
	email: string;
	emailVerified?: boolean;
	phoneNumber?: string;
	password: string;
	displayName: string;
	photoURL?: string;
	disabled?: boolean;
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
	return new Promise((resolve, reject) => {
		auth()
			.getUser(uid)
			.then((userRecord) => {
				// See the UserRecord reference doc for the contents of userRecord.
				console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
				resolve(userRecord);
			})
			.catch((error) => {
				console.log('Error fetching user data:', error);
				reject(error);
			});
	});
};

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
}: ICreateUserArgs): Promise<UserRecord> => {
	return new Promise((resolve, reject) => {
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
				resolve(userRecord);
			})
			.catch((error) => {
				console.log('Error creating new user:', error);
				reject(error);
			});
	});
};

export const updateUser = (uid: string, args: IUpdateUserArgs) => {
	return new Promise((resolve, reject) => {
		// lookup user
		getUser(uid)
			.then((userRecord) => {
				// update user
				const updateUserArgs = {};

				// get all non empty object fields
				Object.entries(args).forEach(([key, val]) => {
					if (val) updateUserArgs[key] = val;
				});
				auth()
					.updateUser(uid, updateUserArgs)
					.then((userRecord) => {
						// See the UserRecord reference doc for the contents of userRecord.
						console.log('Successfully updated user', userRecord.toJSON());
						resolve(userRecord);
					})
					.catch((error) => {
						console.log('Error updating user:', error);
						reject(error);
					});
			})
			.catch((error) => {
				console.error('Error fetching user data: ', error);
				reject(error);
			});
	});
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
	return new Promise((resolve, reject) => {
		auth()
			.deleteUsers(uids)
			.then((deleteUsersResult) => {
				if (!deleteUsersResult.successCount) {
					resolve(`No users deleted`);
				}

				if (deleteUsersResult.successCount) {
					resolve(
						`Successfully deleted ${deleteUsersResult.successCount} users`
					);
				}

				if (!deleteUsersResult.failureCount) {
					deleteUsersResult.errors.forEach((err) => {
						console.log(err.error.toJSON());
					});
					resolve(`Failed to delete ${deleteUsersResult.failureCount} users`);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const createCustomToken = (uid: string) => {
	return new Promise((resolve, reject) => {
		auth()
			.createCustomToken(uid)
			.then((customToken) => {
				// Send token back to client
				resolve(customToken);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const verifyToken = (idToken: string) => {
	return new Promise((reject, resolve) => {
		auth()
			.verifyIdToken(idToken)
			.then((decodedToken) => {
				resolve(decodedToken.uid);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
