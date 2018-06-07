const request = require('supertest');
const app = require('../app');

const crewData = {"name": "tasdfe"}

describe('Crew', () => {
  it('Create Test Valid', () => {
    return request(app)
    .post('/api/crew')
    .send(crewData)
    .set('Accept', 'application/json')
    .expect(200,{
      message: "Created Crew"
    }) 
  });
});