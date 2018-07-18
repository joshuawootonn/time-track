
module.exports = {
  extends: ['last', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
  "env": {
    "amd": true,
    "node": true,
    "browser": true,
    "es6": true
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true, 
        trailingComma: 'all',
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
};