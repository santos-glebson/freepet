const express = require("express");
const router = express.Router();
const complaintsController = require("../controllers/complaintsController");
const multer = require("multer");
const path = require("path");

//Multer Settings
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "images", "complaint-photos"));
    //caminho da pasta em que vai ser salvo as imagens ↑
  },
  filename: function (req, file, cb) {
    cb(null, String(Date.now() + ".jpg").replace(" ", "-"));
    //Nome que vai ser salva a imagem ↑
  },
});

var upload = multer({ storage: storage });

router.get("/createComplaint/:userId", async (req, res) => {
  let userId = req.params.userId;
  res.render("newComplaint", {
    title: "Nova denúncia",
    css: "../../styles/profile.css",
    userId,
  });
});

router.post("/redirect/:userId", upload.any(), complaintsController.create);

router.get("/:userId/:complaintId", complaintsController.selectComplaint);

router.post(
  "/update/:userId/:complaintId",
  upload.any(),
  complaintsController.updateComplaint,
);

router.get(
  "/deleteComplaint/:userId/:complaintId",
  complaintsController.deleteComplaint,
);

module.exports = router;
