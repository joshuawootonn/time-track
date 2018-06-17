const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV ='test'

const model = app.models['Category']
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
    type: 'PCC'
  }, {
    id: 2,
    type: 'Earthwork'
  }, {
    id: 3,
    type: 'Setup'
  }],()=> { done();}) 
})

describe('/categories', () => {
  
  test('gets all category', done => {
    return request(app).get('/api/categories').expect(200,done)
  })
  test('gets a category', done => {
    return request(app).get('/api/categories/1').expect(200).then(response => {
      expect(response.body.type).toBe('PCC');
      done();
    })
  })
  test('creates a new category', (done) => {
    return request(app).post('/api/categories').send(createData).expect(200, done);
  });
  test('updates category 4', done => {
    return request(app).put('/api/categories/3').send(updateData).expect(200,done);
  })
  test('deletes a category', (done)=> {
    return request(app).delete('/api/categories/3').send().expect(200,done);
  })
})