/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'shift',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,        
        autoIncrement: true
      },
      clock_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      clock_out: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      length: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      employee_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id',
        },
      },
    },
    {
      tableName: 'shift',
      timestamps: false,
    },
  );
};
