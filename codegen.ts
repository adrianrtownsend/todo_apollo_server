import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'src/typeDefs/schema.graphql',
	generates: {
		'src/types/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
	},
};

export default config;
