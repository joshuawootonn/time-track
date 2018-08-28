module.exports = {
  "extends": ["last","plugin:react/recommended" ],
  "env": {
    "amd": true,
    "node": true,
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module",
},
  "rules": {
    'max-len': ["error", { "code": 100 }],
    'no-console': 'off',
    'eqeqeq': ['error', 'always'], // adding some custom ESLint rules
    'semi': ['warn', 'always'],
    'quotes': ['error', 'single'],
    "object-curly-spacing": [2, "always"],
    "arrow-parens": ["error", "as-needed"],
    
  },
};


