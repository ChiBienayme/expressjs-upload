const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const upload = multer({ dest: "./public/uploads" });

app.use(express.static("public"));

app.post("/user", upload.single("image"), (req, res) => {
	fs.renameSync(
		req.file.path,
		path.join(req.file.destination, req.file.originalname)
	);

	res.send("Image received");
});

app.get("/uploads/image.jpeg", upload.single("image"), (req, res) => {
	fs.renameSync(
		req.file.path,
		path.join(req.file.destination, req.file.originalname)
	);

	res.send("Image received");
});

app.listen(8000, () => console.log("Listening"));