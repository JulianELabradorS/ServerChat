const sequelize = require('../conection');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
	'users',
	{
		// Model attributes are defined here
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nickName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		connected: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		freezeTableName: true,
	}
);
User.sync();
module.exports = User;
