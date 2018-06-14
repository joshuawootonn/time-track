/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'authority',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
      },
    },
    {
      tableName: 'authority',
      timestamps: false,
    },
  );
};
