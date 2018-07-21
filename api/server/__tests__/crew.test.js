const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV = 'test';

const model = app.models['Crew'];

const createData = {
  name: 'new',
};

const updateData = {
  name: 'newer',
};

describe('/crew', () => {
  beforeAll(done => {
    model.destroyAll(err => {
      model.create(
        [
          {
            name: 'Crew 1',
          },
          {
            name: 'Crew 2',
          },
          {
            name: 'Crew 3',
          },
        ],
        () => {
          done();
        },
      );
    });
  });
  afterAll(done => {
    app.dataSources.db.disconnect();
    done();
  });
  test('gets all crew', done => {
    return request(app)
      .get('/api/crews')
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(3);
        done();
      });
  });
  test('gets a crew', done => {
    return request(app)
      .get('/api/crews/1')
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Crew 1');
        done();
      });
  });
  test('creates a new crew', done => {
    return request(app)
      .post('/api/crews')
      .send(createData)
      .expect(200, done);
  });
  test('updates crew 3', done => {
    return request(app)
      .put('/api/crews/3')
      .send(updateData)
      .expect(200, done);
  });
  test('deletes crew 2', done => {
    return request(app)
      .delete('/api/crews/2')
      .send()
      .expect(200, done);
  });
});
