// const request = require('supertest');
// const app = require('../app').app;

// describe('Crew', () => {
//   it('Create Test Valid', () => {
//     return request(app)
//     .post('/crew')
//     .send({type: "crew2"})
//     .set('Accept', 'application/json')
//     .expect(200)
//     .then((res) => {
//       expect(typeof res.body.message).toBe('string');
//       expect(res.body.message).toBe('Created crew');
//     });
//   });
// });