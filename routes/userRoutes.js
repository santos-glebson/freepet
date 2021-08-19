const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");

//Multer Settings
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "images", "user-photos"));
    //caminho da pasta em que vai ser salvo as imagens ↑
  },
  filename: function (req, file, cb) {
    cb(null, String(Date.now() + ".jpg").replace(" ", "-"));
    //Nome que vai ser salva a imagem ↑
  },
});

var upload = multer({ storage: storage });

router.get("/:id", userController.room);
router.get("/profile/:id", userController.profile);
router.post("/updateUser/:id", upload.any(), userController.updateUser);

module.exports = router;
