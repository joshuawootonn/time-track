const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV = 'test'


const createData = {
  id: 4,
  type: 'create'
};

const updateData = {
  type: 'update',
};

beforeEach((done) => {
  const model = app.models['Authority']

  model.destroyAll((err) => { });
  model.create([{
    id: 1,
    type: 'admin'
  }, {
    id: 2,
    type: 'manager'
  }, {
    id: 3,
    type: 'employee'
  }],()=> { done();})

 
})

describe('/authority', () => {
  
  test('gets all authority', done => {
    return request(app).get('/api/authorities').expect(200).then(response => {
      expect(response.body.length).toBe(3);
      done();
    })
  })
  test('gets a authority', done => {
    return request(app).get('/api/authorities/1').expect(200).then(response => {
      expect(response.body.type).toBe('admin');
      done();
    })
  })
  test('creates a new authority', (done) => {
    return request(app).post('/api/authorities').send(createData).expect(200, done);
  });
  test('updates authority 1', done => {
    return request(app).put('/api/authorities/1').send(updateData).expect(200,done);
  })
  test('deletes a authority', (done)=> {
    return request(app).delete('/api/authorities/1').send().expect(200,done);
  })
})