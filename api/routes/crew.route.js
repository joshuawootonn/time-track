module.exports = function(router) {
  const crew = require('../controllers/crew.controller');
  router.post('/crew', crew.create);
  router.get('/crew', crew.find);
  router.put('/crew', crew.update);
  router.delete('/crew', crew.destroy);
};
