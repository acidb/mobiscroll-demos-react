module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['import', 'react-refresh'],
  rules: {
    'arrow-body-style': ['warn', 'as-needed'],
    'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    'no-var': 'warn',
    'prefer-arrow-callback': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
  },
};
