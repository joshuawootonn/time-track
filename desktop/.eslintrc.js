
module.exports = {
  extends: ['last', 'plugin:react/recommended'],
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
  "env": {
    "amd": true,
    "node": true,
    "browser": true,
    "es6": true
  },
  rules: {
    'max-len':["error", { "code": 100 }],
    'no-console': 'off',
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
};