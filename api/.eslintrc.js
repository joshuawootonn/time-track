module.exports = {
  extends: ['eslint:recommended','last', 'prettier'], // extending recommended config and config derived from eslint-config-prettier
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
  rules: {
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true, 
        trailingComma: 'all',
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
    'no-unused-vars': ['error', { "args": "none" }],
    "no-console": 'off',
  },
  env:{
    "jest": true,
    "browser": true,
    "node": true,
    "es6" : true
  }
};