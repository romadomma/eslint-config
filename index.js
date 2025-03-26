import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export const getRomadommaConfig = ({ parserOptions }) => {
  return [
    stylistic.configs.customize({
      jsx: false,
      semi: true,
    }),
    ...tseslint.config(
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ),
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },  
        parser: tsParser,
        parserOptions: {
          ...parserOptions,
          projectService: true,
        },
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            overrides: {
              constructors: 'off',
            },
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            'checksVoidReturn': false,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: [
              'variableLike',
              'memberLike',
              'method',
              'property',
            ],
            format: ['camelCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: [
              'enumMember',
              'typeLike',
            ],
            format: ['PascalCase'],
          },
        ],
        '@stylistic/no-trailing-spaces': ['error', { 'skipBlankLines': true }],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/indent': ['error', 2],
      },
    }
  ];
};