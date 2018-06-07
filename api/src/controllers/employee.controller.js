

const models = require('../models')
exports.create = (req, res) => {
  models.employee.create({
    name: "Joshua Wootonn",
    pin: 565656,
    is_employed: true,
    is_working: false,
    authority_id: 1,
    crew_id: 1
  }).then(() => {
    res.send({ message: "Created employee" });
  }).catch((error) => {
    res.status(400).send({ message: error })
  })

};
exports.find = (req, res) => {
  models.employee.create({
    type: "crew1"
  }).then((message) => {
    res.send({ message });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.update = (req, res) => {
  models.employee.create({
    type: "crew1"
  }).then(() => {
    res.send({ message: "Created employee" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};
exports.destroy = (req, res) => {
  models.employee.create({
    type: "crew1"
  }).then(() => {
    res.send({ message: "Created employee" });
  }).catch(() => {
    res.status(400).send({ message: "Not valid data" })
  })


};