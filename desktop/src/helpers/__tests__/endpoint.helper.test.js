import { generateCRUDEndpoints } from 'helpers/endpoint.helper';

import * as axios from 'axios';

import { keyCount } from 'helpers/test.helper';

jest.mock('axios');
describe('Endpoint Helpers', () => {
  it('generateCRUDEndpoints method should return five functions', () => {
    expect(keyCount(generateCRUDEndpoints('asdf'))).toEqual(5);
  });
  it('generateCRUDEndpoints method should have a key for get,getAll,delet,post, and put', () => {
    const generatedEndpoints = generateCRUDEndpoints('asdf');
    expect(generatedEndpoints.get).toBeDefined();
    expect(generatedEndpoints.getAll).toBeDefined();
    expect(generatedEndpoints.put).toBeDefined();
    expect(generatedEndpoints.post).toBeDefined();
    expect(generatedEndpoints.delet).toBeDefined();
  });
  
  it('generateCRUDEndpoints method should return functions that all return promises', () => {
    const generatedEnpoints = generateCRUDEndpoints('asdf');
    axios.get.mockImplementation(() => Promise.resolve({ data: true }));
    axios.put.mockImplementation(() => Promise.resolve({ data: true }));
    axios.post.mockImplementation(() => Promise.resolve({ data: true }));
    axios.delete.mockImplementation(() => Promise.resolve({ data: true }));
    expect.assertions(5);
    generatedEnpoints.getAll().then(data => expect(data).toBeTruthy());
    generatedEnpoints.get().then(data => expect(data).toBeTruthy());
    generatedEnpoints.post().then(data => expect(data).toBeTruthy());
    generatedEnpoints.put(1).then(data => expect(data).toBeTruthy());
    generatedEnpoints.delet(1).then(data => expect(data).toBeTruthy());
  });
});