const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV ='test'

const model = app.models['Authority']
const createData = {
  id: 4,
  type: 'new'
};

const updateData = {
  type: 'newer',
};

beforeEach((done) => {
 
  model.destroyAll((err) => { });
  model.create([{
    id: 1,
    type: 'Admin'
  }, {
    id: 2,
    type: 'Manager'
  }, {
    id: 3,
    type: 'Employee'
  }],()=> { done();}) 
})

describe('/authority', () => {
  
  test('gets all authority', done => {
    return request(app).get('/api/authorities').expect(200,done)
  })
  test('gets a authority', done => {
    return request(app).get('/api/authorities/1').expect(200).then(response => {
      expect(response.body.type).toBe('Admin');
      done();
    })
  })
  test('creates a new authority', (done) => {
    return request(app).post('/api/authorities').send(createData).expect(200, done);
  });
  test('updates authority 4', done => {
    return request(app).put('/api/authorities/4').send(updateData).expect(200,done);
  })
  test('deletes a authority', (done)=> {
    return request(app).delete('/api/authorities/4').send().expect(200,done);
  })
})