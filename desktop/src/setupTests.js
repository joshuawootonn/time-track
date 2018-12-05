import 'jest-enzyme';
const Enzyme = require('enzyme');

const Adapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new Adapter() });

// global.window = new jsdom.JSDOM().window;
// global.document = window.document;
global.window = {
  require: jest.fn()
};

const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};