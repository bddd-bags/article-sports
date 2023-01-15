const { Category } = require("../models");

class CategoryController {
	static index = async (req, res) => {
		try {
			const categories = await Category.findAll({
				order: [["id", "desc"]],
			});

			res.status(200).json({ message: "Success", data: categories });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static store = async (req, res) => {
		try {
			const category = await Category.create(req.body);

			res.status(201).json({ message: "Created", data: category });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static update = async (req, res) => {
		try {
			const getCategoryId = await Category.findByPk(req.params.id);

			if (!getCategoryId)
				return res.status(404).json({ message: "Id not found!" });

			const category = getCategoryId.update({
				name: req.body.name,
			});

			res.status(200).json({ message: "Updated" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static delete = async (req, res) => {
		try {
			const category = await Category.destroy({ where: { id: req.params.id } });

			!category
				? res.status(200).json({ message: "Id not found!" })
				: res.status(200).json({ message: "Deleted" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};

	static findOne = async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOne({ where: { id } });

			res.status(200).json({ message: "Success", data: category });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	};
}

module.exports = CategoryController;
