const app = require('../server.js')
const request = require('supertest')
process.env.NODE_ENV = 'test'

const model = app.models['Category']
const createData = {
  type: 'new',
}

const updateData = {
  type: 'newer',
}

describe('/categories', () => {
  beforeAll((done) => {
    model.destroyAll((err) => {
      model.create(
        [
          {
            type: 'PCC',
          },
          {
            type: 'Earthwork',
          },
          {
            type: 'Setup',
          },
        ],
        () => {
          done()
        },
      )
    })
  })
  afterAll((done) => {
    app.dataSources.db.disconnect()
    done()
  })
  test('gets all category', (done) => {
    return request(app).get('/api/categories').expect(200, done)
  })
  test('gets a category', (done) => {
    return request(app)
      .get('/api/categories/1')
      .expect(200)
      .then((response) => {
        expect(response.body.type).toBe('PCC')
        done()
      })
  })
  test('creates a new category', (done) => {
    return request(app)
      .post('/api/categories')
      .send(createData)
      .expect(200, done)
  })
  test('updates category 3', (done) => {
    return request(app)
      .put('/api/categories/3')
      .send(updateData)
      .expect(200, done)
  })
  test('deletes category 2', (done) => {
    return request(app).delete('/api/categories/2').send().expect(200, done)
  })
})
