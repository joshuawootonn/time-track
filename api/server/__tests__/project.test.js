const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV = 'test';

const model = app.models['Project'];
const date = new Date()
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ');
const createData = {
  name: 'Project 4',
  isActive: '0',
  date: `${date}`,
};

const updateData = {
  name: 'Project 4',
  isActive: '1',
  date: `${date}`,
};

describe('/projects', () => {
  beforeAll(done => {
    model.destroyAll(err => {
      model.create(
        [
          {
            name: 'Project 1',
            isActive: '1',
            date: `${date}`,
          },
          {
            name: 'Project 2',
            isActive: '1',
            date: `${date}`,
          },
          {
            name: 'Project 3',
            isActive: '0',
            date: `${date}`,
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
  test('gets all project', done => {
    return request(app)
      .get('/api/projects')
      .expect(200, done);
  });
  test('gets a project', done => {
    return request(app)
      .get('/api/projects/1')
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('Project 1');
        done();
      });
  });
  test('creates a new project', done => {
    return request(app)
      .post('/api/projects')
      .send(createData)
      .expect(200, done);
  });
  test('updates project 3', done => {
    return request(app)
      .put('/api/projects/3')
      .send(updateData)
      .expect(200, done);
  });
  test('deletes project 2', done => {
    return request(app)
      .delete('/api/projects/2')
      .send()
      .expect(200, done);
  });
});
