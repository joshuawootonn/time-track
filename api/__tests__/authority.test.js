const request = require('supertest');
const app = require('../app');
import models from '../models';

const authorityData = {"type": "fdsaf"}

beforeAll(()=>{
  models.sequelize.sync({force: true})
  .then(function() {
    done(null);
  })
  .error(function(error) {
    done(error);
  });
});



describe('Authority Routes', () => {



  it('Creates a Authority record', () => {
    return request(app)
    .post('/api/authority')
    .send(authorityData)
    .set('Accept', 'application/json')
    .expect(200,{
      message: "Authority Created"
    }) 
  });

  // it('Deletes a Authority record', () => {
  //   return request(app)
  //   .get()
  // })
});

