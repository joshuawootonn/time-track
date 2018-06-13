const request = require('supertest');
const app = require('../app');
import models from '../models';
const { execSync } = require('child_process');

const createData = { 
  type: 'create'
};

const updateData = {
  type: 'update',
};

beforeAll(() => {
  models.sequelize.sync({ force: true }).then(function() {
    execSync('sequelize db:seed:all');
  });
});

describe('Authority Routes', () => {
  it('Create a Authority record', done => {
    return request(app)
      .post('/api/authority')
      .send(createData)
      .set('Accept', 'application/json')
      .expect(
        200,
        {
          message: 'Authority Created',
        },
        done,
      );
  });

  it('Get all Authority records', done => {
    return request(app)
      .get('/api/authority')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(5);
        done();
      });
  });

  it('Get a Authority record', done => {
    return request(app)
      .get('/api/authority/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.type).toEqual('employee');
        done();
      });
  });

  it("Don't Gets a Authority record", done => {
    return request(app)
      .get('/api/authority/55fgsfd5')
      .set('Accept', 'application/json')
      .expect(404)
      .then(response => {
        done();
      });
  });
  it('Update a Authority record', done => {
    return request(app)
      .put('/api/authority/1')
      .send(updateData)
      .set('Accept', 'application/json')
      .expect(
        200,
        {
          message: 'Authority Updated',
        },
        done,
      );
  });
  it('Delete a Authority record', () => {
    return request(app)
      .delete('/api/authority/4')
      .expect(200, {
        message: 'Authority Deleted',
      });
  });
});
