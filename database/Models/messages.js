const sequelize = require('../conection');
const { DataTypes } = require('sequelize');
const User = require('./user');

const Message = sequelize.define(
	'Messages',
	{
		// Model attributes are defined here
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);
Message.belongsTo(User);

module.exports = Message;
