const router = require('express').Router()
const routeArticles = require("./article");
const routeUsers = require("./user");
const routeCategory = require("./category");

router.get("/", (req, res) => res.json("ini adalah home page!"));
router.use("/api", routeUsers);
router.use("/api/articles", routeArticles);
router.use("/api/categories", routeCategory);
router.use((req, res) => {
	res.status(404).json({ message: "PAGE_NOT_FOUND!" });
});

module.exports = router