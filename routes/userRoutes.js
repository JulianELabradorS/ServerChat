const express = require('express');

const { userCreate, userLogin } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', (req, res) => {
	const data = req.body;
	console.log(data);
	userCreate(data)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/login', (req, res) => {
	const data = req.body;
	userLogin(data)
		.then((jwt) => {
			res.status(200).json(jwt);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;
