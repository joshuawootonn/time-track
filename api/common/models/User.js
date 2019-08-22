var models = require('../../server/model-config.json');
var loopback = require('loopback');
var app = loopback();

module.exports = function(User) {
  User.disableRemoteMethodByName("upsert"); // disables PATCH /Users
  User.disableRemoteMethodByName("find"); // disables GET /Users
  User.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /Users
  User.disableRemoteMethodByName("create"); // disables POST /Users

  User.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /Users/{id}
  User.disableRemoteMethodByName("findById"); // disables GET /Users/{id}
  User.disableRemoteMethodByName("exists"); // disables HEAD /Users/{id}
  User.disableRemoteMethodByName("replaceById"); // disables PUT /Users/{id}
  User.disableRemoteMethodByName("deleteById"); // disables DELETE /Users/{id}

  User.disableRemoteMethodByName("prototype.__get__accessTokens"); // disable GET /Users/{id}/accessTokens
  User.disableRemoteMethodByName("prototype.__create__accessTokens"); // disable POST /Users/{id}/accessTokens
  User.disableRemoteMethodByName("prototype.__delete__accessTokens"); // disable DELETE /Users/{id}/accessTokens

  User.disableRemoteMethodByName("prototype.__findById__accessTokens"); // disable GET /Users/{id}/accessTokens/{fk}
  User.disableRemoteMethodByName("prototype.__updateById__accessTokens"); // disable PUT /Users/{id}/accessTokens/{fk}
  User.disableRemoteMethodByName("prototype.__destroyById__accessTokens"); // disable DELETE /Users/{id}/accessTokens/{fk}

  User.disableRemoteMethodByName("prototype.__count__accessTokens"); // disable  GET /Users/{id}/accessTokens/count

  User.disableRemoteMethodByName("prototype.verify"); // disable POST /Users/{id}/verify
  User.disableRemoteMethodByName("changePassword"); // disable POST /Users/change-password
  User.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /Users/change-stream

  User.disableRemoteMethodByName("confirm"); // disables GET /Users/confirm
  User.disableRemoteMethodByName("count"); // disables GET /Users/count
  User.disableRemoteMethodByName("findOne"); // disables GET /Users/findOne

  //User.disableRemoteMethodByName("login");                                // disables POST /Users/login
  //User.disableRemoteMethodByName("logout");                               // disables POST /Users/logout

  User.disableRemoteMethodByName("resetPassword"); // disables POST /Users/reset
  User.disableRemoteMethodByName("setPassword"); // disables POST /Users/reset-password
  User.disableRemoteMethodByName("update"); // disables POST /Users/update
  User.disableRemoteMethodByName("upsertWithWhere");
};