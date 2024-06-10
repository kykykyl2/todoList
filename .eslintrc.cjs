module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'all'],
    eqeqeq: 'error',
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const'],
      },
      {
        blankLine: 'any',
        next: ['const'],
        prev: ['const'],
      },
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [
          'none',
          'all',
          'multiple',
          'single',
        ],
        allowSeparatedGroups: true,
      },
    ],
  },
}
