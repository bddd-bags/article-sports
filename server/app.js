require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const cors = require("cors");
const router = require("./routes");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
