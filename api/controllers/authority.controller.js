

import * as models from '../models';

exports.create = (req, res) => {
  
  models.authority.create({
    type: req.body.type
  }).then(() => {
    res.send(200);
  }).catch((error) => {
    res.status(400).send({ error: error })
  })
};
exports.findAll = (req, res) => {
  models.authority.findAll()
  .then((authorities) => {
    res.send(authorities);
  }).catch((error) => {
    res.status(400).send({ error: error })
  })
};
exports.find = (req, res) => {
  models.authority.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((authorities) => {
    res.send(authorities);
  }).catch((error) => {
    res.status(400).send({ error: error })
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