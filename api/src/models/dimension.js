/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'dimension',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      tableName: 'dimension',
    },
  );
};
