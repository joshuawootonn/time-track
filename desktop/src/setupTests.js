import 'jest-enzyme';
const Enzyme = require(`enzyme`);

import * as IPCConstants from 'constants/ipc';

const Adapter = require(`enzyme-adapter-react-16`);
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new Adapter() });

// global.window = new jsdom.JSDOM().window;
// global.document = window.document;
global.window = {
  require: jest.fn()
};

//const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  //originalConsoleError(message);
};
console.warn = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  //originalConsoleWarn(message);
};
//console.log = jest.fn();
global.window.require = function () {
  return {
    ipcRenderer: {
      send: function () {
        // Fake sending message to ipcMain
      },
      on: function (string, fun) {
        fun(null, string);
      },
      sendSync: function(key) {
        if(key === IPCConstants.GET_CRED){
          return { username: `josh`, password: `5656` };
        }else if (key === IPCConstants.CREATE_EXPORT){
          return {};
        }
      }
    }
  };
};