const app = require('../server.js');
const request = require('supertest');
process.env.NODE_ENV = 'test';

const subCategoryModel = app.models['Subcategory'];

const createData = {
  id: 3,
  type: 'Driveway',
  categoryId: '1',
  dimensionId: '1',
};

const updateData = {
  type: 'Grading',
  categoryId: '1',
  dimensionId: '1',
};



describe('/subCategory', () => {
  beforeEach(done => {
    subCategoryModel.destroyAll(err => {});
    subCategoryModel.create(
      [
        {
          id: 1,
          type: 'Sidewalk',
          categoryId: '1',
          dimensionId: '1',
        },
        {
          id: 2,
          type: 'Pavement',
          categoryId: '1',
          dimensionId: '1',
        },
      ],
      err => {
        done();
      },
    );
  });
  test('gets all subCategory', done => {
    return request(app)
      .get('/api/subCategories')
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(2);
        done();
      });
  });
  test('gets a subCategory', done => {
    return request(app)
      .get('/api/subCategories/1')
      .expect(200)
      .then(response => {
        expect(response.body.type).toBe('Sidewalk');
        done();
      });
  });
  test('creates a new subCategory', done => {
    return request(app)
      .post('/api/subCategories')
      .send(createData)
      .expect(200, done);
  });
  test('deletes subCategory 2', done => {
    return request(app)
      .delete('/api/subCategories/2')
      .send()
      .expect(200, done);
  });
  test('updates subCategory 1', done => {
    return request(app)
      .put('/api/subCategories/1')
      .send(updateData)
      .expect(200, done);
  });
});
