const request = require('supertest');
const app = require('../app');
test('Base Route Test', (done) => {
  request(app)
    .get('/')
    .expect(200, 'Hello World!')
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});