const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { hashBcrypt, compareBcrypt } = require("../helpers/bcrypt");

class UserController {
	static register = async (req, res) => {
		try {
			const { username, email, password } = req.body;

			const user = await User.create({
				username,
				email,
				password,
			});

			res.status(201).json({ user });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static login = async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email: email } });

			if (!user) return res.status(404).json({ message: "email not found!" });
			if (!compareBcrypt(password, user.password))
				return res.status(403).json({ message: "wrong password!" });
			const access_token = jwt.sign({ user }, "upin dan ipin inilah dia", {
				expiresIn: "1d",
			});
			res.status(200).json({ access_token });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static update = async (req, res) => {
		try {
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static delete = async (req, res) => {
		try {
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static findOne = async (req, res) => {
		try {
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};
}

module.exports = UserController;
