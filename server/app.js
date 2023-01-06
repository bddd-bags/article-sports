require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
