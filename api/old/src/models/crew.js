/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'crew',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        primaryKey: true,        
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: false,
      },
    },
    {
      tableName: 'crew',
      timestamps: false,
    },
  );
};
