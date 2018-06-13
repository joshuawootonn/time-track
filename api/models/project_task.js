/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'project_task',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,          
        autoIncrement: true    
      },
      task_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'task',
          key: 'id',
        },
      },
      project_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'project',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      estimate_time: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
    },
    {
      tableName: 'project_task',
      timestamps: false,
    },
  );
};
