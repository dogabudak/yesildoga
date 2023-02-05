module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'simple-import-sort',
    'react',
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@atoms', './src/components/atoms/'],
          ['@helpers', './src/components/helpers/'],
          ['@molecules', './src/components/molecules/'],
          ['@organisms', './src/components/organisms/'],
          ['@rnd/one-components', './packages/components/src/'],
          ['@style', './src/style/'],
          ['@templates', './src/components/templates/'],
          ['@type', './src/types/'],
          ['@mockdata', './src/mockdata/'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/forbid-dom-props': 'off',
      },
    },
    {
      files: ['**/*.test.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['src/pages/**'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  rules: {
    curly: ['error', 'all'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-default-export': ['error'],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'max-params': ['error', 3],
    'no-console': 'off',
    'no-duplicate-imports': 'off',
    'simple-import-sort/imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    'react/forbid-dom-props': [1, { forbid: ['style'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react-hooks/rules-of-hooks': 'error',
    'react/boolean-prop-naming': [
      2,
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: 'Functions that return a boolean need to start with is or has.',
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
