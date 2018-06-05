/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('articles', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'articles'
	});
};
