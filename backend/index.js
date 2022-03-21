const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const upload = multer({ dest: "./public/uploads" });

app.use(cors());
app.use(express.static("public"));

const users = [
  {
    name: "Chi",
  },
];

// Show user
app.get("/user", (req, res) => {
  res.json(users);
});

// Show image
app.get("/uploads/image.jpeg");

app.post("/user", upload.single("image"), (req, res) => {
  const user = req.body;

  fs.renameSync(
    req.file.path,
    path.join(req.file.destination, req.file.originalname)
  );

  users.push(user);
  res.send("Image received");
  res.json({ message: "New user is added", users });
});

app.listen(8000, () => console.log("Listening"));
