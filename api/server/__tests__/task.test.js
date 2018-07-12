const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV = 'test';

const taskModel = app.models['Task'];

const createData = {
  id: 3,
  name: '5" Sidewalk',
  isActive: '1',
  subcategoryId: '1',
};

const updateData = {
  name: '4" Sidewalk',
  isActive: '1',
  subcategoryId: '1',
};



describe('/tasks', () => {
  beforeEach(done => {
    taskModel.destroyAll(err => {
      taskModel.create(
        [
          {
            id: 1,
            name: '7" Sidewalk',
            isActive: '1',
            subcategoryId: '1',
          },
          {
            id: 2,
            name: '6" Sidewalk',
            isActive: '1',
            subcategoryId: '1',
          },
        ],
        err => {
          done();
        },
    );
    });

  });
  test('gets all task', done => {
    return request(app)
      .get('/api/tasks')
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(2);
        done();
      });
  });
  test('gets a task', done => {
    return request(app)
      .get('/api/tasks/1')
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe('7" Sidewalk');
        done();
      });
  });
  test('creates a new task', done => {
    return request(app)
      .post('/api/tasks')
      .send(createData)
      .expect(200, done);
  });
  test('deletes task 2', done => {
    return request(app)
      .delete('/api/tasks/2')
      .send()
      .expect(200, done);
  });
  test('updates task 1', done => {
    return request(app)
      .put('/api/tasks/1')
      .send(updateData)
      .expect(200, done);
  });
});
