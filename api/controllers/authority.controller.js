

import * as models from '../models';

exports.create = (req, res) => {
  
  models.authority.create({
    type: req.body.type
  }).then(() => {
    res.send(200);
  }).catch((error) => {
    res.status(400).send({ error })
  })
};
exports.findAll = (req, res) => {
  models.authority.findAll()
  .then((authorities) => {
    res.send(authorities);
  }).catch((error) => {
    res.status(400).send({ error })
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
    res.status(400).send({ error })
  })
};
exports.update = (req, res) => {
  models.authority.update({
    ...req.body
  },{
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({ message: "Update admin" });
  }).catch(() => {
    res.status(400).send({ error })
  })

};
exports.destroy = (req, res) => {
  models.authority.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({ message: "Deleted admin" });
  }).catch(() => {
    res.status(400).send({ error })
  })
};

