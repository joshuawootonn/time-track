/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'subcategory',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
      },
      dimension_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'dimension',
          key: 'id',
        },
      },
    },
    {
      tableName: 'subcategory',
      timestamps: false,
    },
  );
};
