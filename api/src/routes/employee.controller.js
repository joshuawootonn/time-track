

 module.exports = function (db){

  const template = require('./template')(db);
  let create = function(req, res) {
    template.create(req.params.data);
  };
  
  let findOne = function(req, res) {
    template.findOne(req.params.id);  
  };
  return {
    create,findOne
  }
 }



