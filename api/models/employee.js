/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'employee',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,          
        autoIncrement: true      
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      pin: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      is_employed: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      is_working: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      authority_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'authority',
          key: 'id',
        },
      },
      crew_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'crew',
          key: 'id',
        },
      },
    },
    {
      tableName: 'employee',
      timestamps: false,
    },
  );
};
