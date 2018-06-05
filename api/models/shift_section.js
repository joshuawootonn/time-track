/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('shift_section', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		length: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		shift_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'shift',
				key: 'id'
			}
		},
		task_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'task',
				key: 'id'
			}
		},
		project_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'project',
				key: 'id'
			}
		}
	}, {
		tableName: 'shift_section'
	});
};
