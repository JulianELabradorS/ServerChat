const jwt = require('jsonwebtoken');
const userModel = require('../database/Models/user');
const bcrypt = require('bcrypt');

const userCreate = (data) => {
	return new Promise((res, rejc) => {
		if (!data.firstName || !data.lastName || !data.nickName || !data.password) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			bcrypt.hash(data.password, 7, function (error, encrypted) {
				if (error) {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				} else {
					data.password = encrypted;
					userModel
						.create(data)
						.then((user) => {
							delete user.dataValues.password;
							res({ message: 'usuario creado con exito' });
						})
						.catch((error) => {
							if (error.fields.nickName) {
								rejc({ status: 400, message: 'Este nick ya esta registrado' });
							} else {
								rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
							}
						});
				}
			});
		}
	});
};
const userLogin = (data) => {
	return new Promise(async (res, rejc) => {
		if (!data.nickName || !data.password) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			const { password, nickName } = data;
			let user = await userModel.findOne({
				where: { nickName: nickName },
				raw: true,
			});
			if (user) {
				bcrypt.compare(password, user.password, (error, result) => {
					if (error) {
						rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
					}
					if (result) {
						delete user.password;
						delete user.connected;
						res({
							token: jwt.sign(user, process.env.JWT_SECRET, {
								expiresIn: '24h',
							}),
						});
					} else {
						rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
					}
				});
			} else {
				rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
			}
		}
	});
};

//SOCKET
const connectedUsers = () => {
	return new Promise((res, rejc) => {
		userModel
			.findAll({ where: { connected: 1 } })
			.then((users) => {
				res(users);
			})
			.catch((error) => {
				rejc(error);
			});
	});
};

module.exports = {
	userCreate,
	userLogin,
	connectedUsers,
};
