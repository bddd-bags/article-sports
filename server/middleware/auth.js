const jwt = require("jsonwebtoken");
module.exports = {
	verifyToken: async (req, res, next) => {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(" ")[1];
		if (!token) return res.status(401).json({ message: "Unauthorized!" });

		try {
			let verify = await jwt.verify(token, "upin dan ipin inilah dia");
			req.user = verify.user;
			next();
		} catch (error) {
			res.status(403).json({ message: "Forbidden!" });
		}
	},
};
