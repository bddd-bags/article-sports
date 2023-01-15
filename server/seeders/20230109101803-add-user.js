"use strict";
const { hashBcrypt } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "admin",
					email: "admin@gmail.com",
					password: hashBcrypt("admin123"),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "admin1",
					email: "admin1@gmail.com",
					password: hashBcrypt("admin123"),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
