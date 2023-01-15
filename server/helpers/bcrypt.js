const bcrypt = require("bcrypt");
const { SALT = 10 } = process.env;

module.exports = {
	hashBcrypt: (password) => {
		const salt = bcrypt.genSaltSync(+SALT);
		return bcrypt.hashSync(password.toString(), salt);
	},

	compareBcrypt: (password, hashPassword) =>
		bcrypt.compareSync(password, hashPassword),
};
