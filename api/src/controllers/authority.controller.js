

const models = require('../models')
exports.create = (req, res) => {
  models.authority.create({
    type: "admin"
  }).then(() => {
    res.send({ message: "Created admin" });
  }).catch((error) => {
    res.status(400).send({ message: error })
  })


  //template.create(req.params.data);
};
exports.find = (req, res) => {
  models.authority.create({
    type: "admin"
  }).then(() => {
    res.send({ message: "Created admin" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.update = (req, res) => {
  models.authority.create({
    type: "admin"
  }).then(() => {
    res.send({ message: "Created admin" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.destroy = (req, res) => {
  models.authority.create({
    type: "admin"
  }).then(() => {
    res.send({ message: "Created admin" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};