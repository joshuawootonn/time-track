/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('task', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true
		},
		is_active: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		dimension_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'dimension',
				key: 'id'
			}
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'category',
				key: 'id'
			}
		},
		subcategory_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'subcategory',
				key: 'id'
			}
		}
	}, {
		tableName: 'task'
	});
};
