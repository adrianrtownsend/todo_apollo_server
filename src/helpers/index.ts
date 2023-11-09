import 'dotenv/config';
import { verifyToken } from '../firebase/index.js';
import { GraphQLError } from 'graphql';

export const authenticateUser = (userToken: string): Promise<string> => {
	return new Promise((resolve) => {
		verifyToken(userToken)
			.then((token) => {
				if (!token)
					throw new GraphQLError('User is not authenticated', {
						extensions: {
							code: 'FORBIDDEN',
							http: { status: 403 },
						},
					});
				resolve(token);
			})
			.catch((error) => {
				console.log('error: ', error);
				throw new GraphQLError('User is not authenticated fail', {
					extensions: {
						code: 'FORBIDDEN',
						http: { status: 403 },
					},
				});
			});
		// throwing a `GraphQLError` here allows us to specify an HTTP status code,
		// standard `Error`s will have a 500 status code by default
	});
};

export const authorizeClient = (apiKey: string) => {
	return new Promise((resolve) => {
		// throwing a `GraphQLError` here allows us to specify an HTTP status code,
		// standard `Error`s will have a 500 status code by default
		if (apiKey !== process.env.API_KEY)
			throw new GraphQLError('Client is not authorized', {
				extensions: {
					code: 'UNAUTHORIZED',
					http: { status: 401 },
				},
			});
		resolve(true);
	});
};
