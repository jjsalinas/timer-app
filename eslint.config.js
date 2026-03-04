import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.{js,ts,tsx}'],

    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
      globals: { ...globals.browser, ...globals.node }
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin
    },

    settings: { react: { version: 'detect' } },

    rules: {
      // Let Prettier handle formatting
      indent: 'off',
      semi: 'off',
      quotes: 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Hooks & Accessibility
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      // Imports
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // General best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];
