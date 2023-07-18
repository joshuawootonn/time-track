const app = require('../server.js')
const request = require('supertest')
process.env.NODE_ENV = 'test'

const shiftModel = app.models['Shift']

const createData = {
  clockInDate: '2018-07-12 04:28:28',
  clockOutDate: '2018-07-12 04:28:28',
  employeeId: '2',
  length: '100',
}

const updateData = {
  clockInDate: '2018-07-12 04:28:28',
  clockOutDate: '2018-07-12 04:28:28',
  employeeId: '1',
  length: '1500',
}

describe('/shifts', () => {
  beforeAll((done) => {
    shiftModel.destroyAll((err) => {
      shiftModel.create(
        [
          {
            clockInDate: '2018-07-12 04:28:28',
            clockOutDate: '2018-07-12 04:28:28',
            employeeId: '1',
            length: '1479',
          },
          {
            clockInDate: '2018-07-12 04:28:28',
            clockOutDate: '2018-07-12 04:28:28',
            employeeId: '1',
            length: '187',
          },
        ],
        (err) => {
          done()
        },
      )
    })
  })
  afterAll((done) => {
    app.dataSources.db.disconnect()
    done()
  })

  test('gets all shifts', (done) => {
    return request(app)
      .get('/api/shifts')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(2)
        done()
      })
  })
  test('gets a shifts', (done) => {
    return request(app)
      .get('/api/shifts/1')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1479)
        done()
      })
  })
  test('creates a new shifts', (done) => {
    return request(app).post('/api/shifts').send(createData).expect(200, done)
  })
  test('deletes shifts 2', (done) => {
    return request(app).delete('/api/shifts/2').send().expect(200, done)
  })
  test('updates shifts 1', (done) => {
    return request(app).put('/api/shifts/1').send(updateData).expect(200, done)
  })
})
