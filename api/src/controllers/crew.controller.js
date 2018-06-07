

const models = require('../models')
exports.create = (req, res) => {
  models.crew.create({
    name: req.body.name
  }).then(() => {
    res.status(200).send({ message: "Created Crew" });
  }).catch((error) => {
    res.status(400).send({ message: error })
  })
  console.log("create")
};
exports.find = (req, res) => {
  models.crew.find({
    type: "crew1"
  }).then(() => {
    res.send({ message: "Created crew" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.update = (req, res) => {
  models.crew.create({
    type: "crew1"
  }).then(() => {
    res.send({ message: "Created crew" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.destroy = (req, res) => {
  models.crew.create({
    type: "crew1"
  }).then(() => {
    res.send({ message: "Created crew" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};