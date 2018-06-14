module.exports = function(router) {
  const employee = require('../controllers/employee.controller');
  router.post('/employee', employee.create);
  router.get('/employee', employee.find);
  router.put('/employee', employee.update);
  router.delete('/employee', employee.destroy);
};
