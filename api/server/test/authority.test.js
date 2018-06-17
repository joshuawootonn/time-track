const app = require('../server.js');
const request = require('supertest');
 process.env.NODE_ENV = 'test'


const createData = {
  type: 'create'
};

const updateData = {
  type: 'update',
};

describe('/authority', () => {

  it('posts a new authority', (done) => {
    return request(app).post('/api/authorities').send(createData).expect(200, done);
  });
 
})