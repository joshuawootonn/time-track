'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Profile.create({
          data: 'profile stuff',
          users: [{
            name: "name",
            ...
          }, {
            name: 'another user',
            ...
          }]}, {
          include: [ model.users]
        }
      ),
      models.Profile.create({
        data: 'another profile',
        users: [{
          name: "more users",
          ...
        }, {
          name: 'another user',
          ...
        }]}, {
          include: [ model.users]
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
