'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Article extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Article.belongsTo(models.Category, {
				foreignKey: "category_id",
				as: "category",
			});

			Article.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
		}
	}
	Article.init(
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: `Title doesn't empyt!`,
					},
				},
			},
			slug: {
				type: DataTypes.STRING,
				unique: { msg: "slug must be unique" },
			},
			description: DataTypes.TEXT,
			img: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
			category_id: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeCreate: (article, options) => {},
			},
			sequelize,
			modelName: "Article",
		},
	);
	return Article;
};