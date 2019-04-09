module.exports = {
  "env": {
    "amd": true,
    "node": true,

    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "parser": "babel-eslint",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "backtick"
    ],
    "semi": [
      "error",
      "never"
    ],
    //'max-len': ["error", { "code": 150 }],
    'no-console': 'off',
    'eqeqeq': ['error', 'always'], // adding some custom ESLint rules
    'semi': ['error', 'always'],
    "object-curly-spacing": [1, "always"],
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "never"],
    //"array-element-newline": ["error", "never"],
    "allowAllPropertiesOnSameLine": false,
    "linebreak-style": 0
  }
};