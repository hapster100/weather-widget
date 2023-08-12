module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
