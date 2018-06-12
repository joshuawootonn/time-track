'use strict';
var models = require('../models');
var moment = require('moment');
module.exports = {
  up: async (queryInterface, Sequelize ) => {



    await models.sequelize.sync({force:true});
    await crew(queryInterface);
    await authority(queryInterface);
    await category(queryInterface);
    await dimension (queryInterface);
    await project(queryInterface);
    
    




      
  },

  down: (queryInterface, Sequelize) => {
    
  }
};



function crew(q){
  return q.bulkInsert('crew',[
    {id: '1', name: "crew 1"},
    {id: '2', name: "crew 2"},
    {id: '3', name: "crew 3"},
    {id: '4', name: "crew 4"},
  ], {});
}
function authority(q){
  return q.bulkInsert('authority',[
    {id: '1', type: "employee"},
    {id: '2', type: "manager"},
    {id: '3', type: "admin"},
  ], {});
}
function category(q){
  return q.bulkInsert('category',[
    {id: '1', type: "PCC"},
    {id: '2', type: "Earth Work"},
    {id: '3', type: "Util"},
  ], {});
}
function dimension(q){
  return q.bulkInsert('dimension',[
    {id: '1', type: "sq ft"},
    {id: '2', type: "sq yd"},
    {id: '3', type: "cu ft"},
    {id: '4', type: "cu yd"},
  ], {});
}
function project(q){

  const now1 = moment(Date.now()).month(-1).format("YYYY-MM-DD HH:MM:SS");
  const now2 = moment(Date.now()).month(-2).format("YYYY-MM-DD HH:MM:SS");
  const now3 = moment(Date.now()).month(-3).format("YYYY-MM-DD HH:MM:SS");
  const now4 = moment(Date.now()).month(-3).format("YYYY-MM-DD HH:MM:SS");

  return q.bulkInsert('project',[
    {id: '1', name: "Project 1", is_active: "1", date: now1},
    {id: '2', name: "Project 2", is_active: "0", date: now2},
    {id: '3', name: "Project 3", is_active: "1", date: now3},
    {id: '4', name: "Project 4", is_active: "1", date: now4},
  ], {});
}

