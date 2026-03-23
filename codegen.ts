import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/queries/**/*.graphql'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        enumsAsTypes: true,
        skipTypename: true,
        inlineFragmentTypes: 'combine',
        maybeValue: 'T | null',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write src/generated/graphql.ts'],
  },
};

export default config;
