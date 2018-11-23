import 'jest-enzyme';

const Enzyme = require('enzyme');

const Adapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new Adapter() });