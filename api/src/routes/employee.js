


module.exports = function (router,db) {
  const template = require('./template')(db); 
  const employee = require('./employee.controller')(db);
  router.post('/employee', employee.create);
  router.get('/employee/:sessionId', function (req, res) {
    template.findOne(req.params.id);
  });
};