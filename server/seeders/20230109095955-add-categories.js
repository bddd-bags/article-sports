"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert(
			"Categories",
			[
				{
					name: "Sepak Bola",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Voli",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Esport",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Bulu Tangkis",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Basket",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Tenis",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Renang",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
