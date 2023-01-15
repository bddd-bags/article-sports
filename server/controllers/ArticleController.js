const { Article, Category } = require("../models");
const { Op, fn, where: $where } = require("sequelize");
const slugify = require("slug-generator");
const fs = require("fs");
const path = require("path");

class ArticleController {
	static index = async (req, res) => {
		try {
			const queryTitle = req.query["Title"];

			let formatWhere = {};

			!queryTitle
				? (formatWhere = {
						user_id: req.user.id,
				  })
				: (formatWhere = {
						user_id: req.user.id,
						title: { [Op.like]: `%${queryTitle}%` },
						// $and: $where(fn("lower", col("title")), {
						// 	$like: `%${queryTitle}%`,
						// }),
				  });

			const articles = await Article.findAll({
				include: [
					{
						model: Category,
						as: "category",
					},
				],
				order: [["id", "desc"]],
				where: formatWhere,
			});

			res.status(200).json({ message: "Success", data: articles });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static store = async (req, res) => {
		try {
			const { title, description, category_id } = req.body;
			if (!req.file) throw new Error("Please input a image!");
			const { filename, mimetype } = req.file;
			if (mimetype.split("/")[0] !== "image")
				throw new Error("Your input is not an image!");
			const user = req.user;
			let slug = slugify(title);
			let checkSlug = await Article.findAll({
				where: { slug: { [Op.like]: `%${slug}%` } },
			});
			if (!!checkSlug.length) {
				slug = slugify(title) + `-${checkSlug[checkSlug.length - 1].id + 1}`;
			}
			const article = await Article.create({
				title,
				slug,
				description,
				img: filename,
				user_id: user.id,
				category_id,
			});
			res.status(201).json({ status: 201, message: "Created", data: article });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static update = async (req, res) => {
		try {
			const { title, description, category_id } = req.body;
			const getArticleId = await Article.findOne({
				where: { id: req.params.id, user_id: req.user.id },
			});

			let slug = slugify(title);
			let checkSlug = await Article.findAll({
				where: { slug: { [Op.like]: `%${slug}%` } },
			});

			if (!!checkSlug.length) {
				slug = slugify(title) + `-${checkSlug[checkSlug.length - 1].id + 1}`;
			}

			if (!!req.file) {
				const { filename: img, mimetype } = req.file;

				if (mimetype.split("/")[0] !== "image")
					throw new Error("Your input is not an image!");

				fs.unlinkSync(
					path.join(__dirname, `../public/assets/images/${getArticleId.img}`),
				);

				getArticleId.update({
					img,
				});
			}

			const article = getArticleId.update({
				title,
				slug,
				description,
				category_id,
			});

			res.status(200).json({ message: "Updated" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static delete = async (req, res) => {
		try {
			const getArticle = await Article.findByPk(req.params.id);

			fs.unlinkSync(
				path.join(__dirname, `../public/assets/images/${getArticle.img}`),
			);

			const article = getArticle.destroy();

			!article
				? res.status(404).json({ message: "Id not found!" })
				: res.status(200).json({ message: "Deleted" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static findOne = async (req, res) => {
		try {
			const { slug } = req.params;
			const article = await Article.findOne({
				where: { slug },
			});

			if (!article) throw new Error("Article not found!");

			res.status(200).json({ message: "Success", data: article });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};
}

module.exports = ArticleController;
