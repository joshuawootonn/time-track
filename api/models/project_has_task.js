/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project_has_task', {
		project_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'project',
				key: 'id'
			}
		},
		task_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'task',
				key: 'id'
			}
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		estimate_time: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'project_has_task'
	});
};
