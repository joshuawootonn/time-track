module.exports = {
  parser: "babel-eslint",
  extends: ['loopback', 'prettier'], // extending recommended config and config derived from eslint config prettier
  plugins: ['prettier','jest'], // activating esling plugin prettier (  fix stuff)
  rules: {
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
  "env": {
    "jest/globals": true
  }
}; 