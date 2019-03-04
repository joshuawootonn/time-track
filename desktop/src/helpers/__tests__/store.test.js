import { normalizeEmbeddedData } from 'helpers/store';

describe('Store Helper', () => {  
  it('normalizeEmbeddedData should produce result arrays for embedded data', () => {
    
    const paramData = {
      entities: {        
        thing: {
          1: {},
          2: {}
        }
      },
      result: {
        thing: [1]        
      }
    };
    const returnData = {
      entities: {        
        thing: {
          1: {},
          2: {}
        }
      },
      result: {
        thing: [1,2]        
      }
    };
    expect(normalizeEmbeddedData(paramData)).toEqual(returnData);
  });
});