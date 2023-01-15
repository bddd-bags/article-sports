'use strict';
const { hashBcrypt } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Article, { foreignKey: "user_id", as: "user" });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Username cannot be empty!",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: {
					msg: "Email already registered, please enter a different email!",
				},
				validate: {
					isEmail: {
						msg: "Incorrect email format!",
					},
					notEmpty: {
						msg: "Email cannot be empty!",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Password cannot be empty!",
					},
					len: {
						args: [6, 200],
						msg: "Passwords are at least 6 to 200 characters long",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (user, option) => {
					user.password = hashBcrypt(user.password);
				},
			},
			sequelize,
			modelName: "User",
		},
	);
	return User;
};