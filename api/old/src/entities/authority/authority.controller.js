import * as models from '../models';

exports.create = (req, res) => {
  models.authority
    .create({
      type: req.body.type,
    })
    .then(() => {
      res.status(200).send({ message: 'Authority Created' });
    })
    .catch(error => {
      res.status(400).send({ error });
      console.log(error);
    });
};
exports.findAll = (req, res) => {
  models.authority
    .findAll()
    .then(authorities => {
      res.status(200).send(authorities);
    })
    .catch(error => {
      res.status(400).send({ error });
    });
};
exports.find = (req, res) => {
  models.authority
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(authority => {
      if (authority) res.status(200).send(authority);
      else res.status(404).send();
    })
    .catch(error => {
      res.status(400).send({ error });
    });
};
exports.update = (req, res) => {
  models.authority
    .update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
    .then(() => {
      res.status(200).send({ message: 'Authority Updated' });
    })
    .catch(error => {
      res.status(400).send({ error });
    });
};
exports.destroy = (req, res) => {
  models.authority
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.status(200).send({ message: 'Authority Deleted' });
    })
    .catch(error => {
      console.log(error);
      res.status(400).send({ error });
    });
};
