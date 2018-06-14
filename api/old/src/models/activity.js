/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,        
        autoIncrement: true
      },
      length: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      shift_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'shift',
          key: 'id',
        },
      },
      project_task_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        foreignKey: true,        
        references: {
          model: 'project_task',
          key: 'id',
        },
      },
      
    },
    {
      tableName: 'activity',
      timestamps: false,
    },
  );
};
