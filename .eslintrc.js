const defaultRules = {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'vue/script-indent': ['error', 2, { baseIndent: 1 }],
  'max-len': [2, { code: 80, tabWidth: 2, ignoreUrls: true }],
};

if (process.env.npm_lifecycle_event === 'watch') {
  defaultRules['no-console'] = 'off';
  defaultRules['no-debugger'] = 'off';
}

module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: defaultRules,

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
      env: {
        jest: true,
      },
    },
  ],

  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/prettier'],
};
