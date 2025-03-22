const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const path = require('node:path');
const { fileURLToPath } = require('node:url');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const stylistic = require('@stylistic/eslint-plugin');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      '@stylistic': stylistic,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: '/home/romadomma/work/quizzy-api',
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
        }
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
  },
];