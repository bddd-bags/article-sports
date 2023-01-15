const multer = require("multer");
const path = require("path");
module.exports = {
	singleUpload: (name) => {
		const diskStorage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, path.join(__dirname, "../public/assets/images"));
			},
			filename: function (req, file, cb) {
				cb(
					null,
					file.fieldname + "-" + Date.now() + path.extname(file.originalname),
				);
			},
		});

		return multer({ storage: diskStorage }).single(name);
	},
};
