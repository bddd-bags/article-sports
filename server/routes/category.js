const { Router } = require("express");
const router = Router();
const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, CategoryController.index);
router.post("/", verifyToken, CategoryController.store);
router.put("/:id", verifyToken, CategoryController.update);
router.delete("/:id", verifyToken, CategoryController.delete);
router.get("/:id", verifyToken, CategoryController.findOne);

module.exports = router;
