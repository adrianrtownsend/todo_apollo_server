import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/index.js';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { seedDatabase } from './seeders/index.js';
import * as mysql from 'mysql2/promise';

// Initialize TypeORM data source
AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
		// seedDatabase();
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
	});

// export const connection = await mysql.createConnection({
// 	host: process.env.MYSQL_HOST,
// 	user: process.env.MYSQL_USER,
// 	database: process.env.MYSQL_DATABASE,
// 	password: process.env.MYSQL_PASSWORD,
// });
// const showTables = await connection.query(`SHOW TABLES`);
// console.log('SHOW TABLES: ', showTables);

// const selectUsers = await connection.query(`SELECT * FROM user`);
// console.log('SELECT * FROM user: ', selectUsers);

// const selectTodos = await connection.query(`SELECT * FROM todo`);
// console.log('SELECT * FROM todo: ', selectTodos);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./src/typeDefs/schema.graphql', {
	encoding: 'utf-8',
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	// addMocksToSchema accepts a schema instance and provides
	// mocked data for each field in the schema
	schema: makeExecutableSchema({ typeDefs, resolvers }),
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
