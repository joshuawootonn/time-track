module.exports = {
  parser: "babel-eslint",
  extends: ['loopback', 'prettier'], // extending recommended config and config derived from eslint config prettier
  plugins: ['jest'], // activating esling plugin prettier (  fix stuff)  
  "env": {
    "jest/globals": true
  }
}; 