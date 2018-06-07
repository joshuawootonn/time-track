

const models = require('../models')
exports.create = (req, res) => {
  console.log(req.body);
  models.authority.create({
    type: req.body.type
  }).then(() => {
    res.send(200);
  }).catch((error) => {
    res.status(400).send({ message: error })
  })
};
exports.find = (req, res) => {
  models.authority.findall({
    where: {
      ...req.body
    }
  }).then((res) => {
    res.send(res);
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