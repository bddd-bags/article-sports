const router = require("express").Router();
const { ArticleController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const { singleUpload } = require("../helpers/multer");

router.get("/", verifyToken, ArticleController.index);
router.post("/", verifyToken, singleUpload("img"), ArticleController.store);
router.put("/:id", verifyToken, singleUpload("img"), ArticleController.update);
router.delete("/:id", verifyToken, ArticleController.delete);
router.get("/:slug", verifyToken, ArticleController.findOne);

module.exports = router;
