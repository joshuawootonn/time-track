module.exports = function (router) {
  const authority = require('../controllers/authority.controller');  
  router.post('/authority', authority.create);
  router.get('/authority/:id',authority.find)
  router.get('/authority',authority.findAll);
  
  router.put('/authority', authority.update);
  router.delete('/authority', authority.destroy);
};