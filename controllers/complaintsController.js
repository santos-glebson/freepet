const Complaint = require("../models/Complaint");
const moment = require("moment");
const { findOneAndDelete } = require("../models/Complaint");
moment.locale("pt-br");
const fs = require("fs");

// To delete the image complaint when a complaint will be excluded

function deleteImage(image) {
  fs.unlink(image, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Imagem apagada");
    }
  });
}

module.exports = {
  create: async (req, res) => {
    try {
      let userId = req.params.userId;
      let address = req.body.address;
      let description = req.body.description;
      let { files } = req;
      let complaint = new Complaint({
        userId,
        address,
        image: files[0].filename,
        formatedDate: moment(Date.now()).format("L"),
        dateStart: moment(Date.now())
          .subtract(3, "hours")
          .format("YYYY-MM-DD hh:mm:ss"),
        dateEnd: moment(Date.now())
          .subtract(1, "day")
          .subtract(3, "hours")
          .format("YYYY-MM-DD hh:mm:ss"),
        formatedDate: moment(Date.now()).format("L"),

        description,
      });
      await complaint.save();
      res.redirect(`/room/${userId}`);
    } catch (error) {
      res.send(error);
    }
  },
  selectComplaint: async (req, res) => {
    try {
      let userId = req.params.userId;
      let complaintId = req.params.complaintId;
      let complaint = await Complaint.findOne({ _id: complaintId });
      res.render("selectedComplaint", {
        complaint,
        title: "Denúncia",
        css: "../../styles/profile.css",
        userId,
        complaintId,
      });
    } catch (error) {
      res.send(error);
    }
  },
  updateComplaint: async (req, res) => {
    try {
      let userId = req.params.userId;
      let complaintId = req.params.complaintId;
      let address = req.body.address;
      let description = req.body.description;
      let { files } = req;
      let findImage = await Complaint.findOne({ _id: complaintId });
      if (!files[0]) {
        findImage.image = findImage.image;
      } else {
        findImage.image = files[0].filename;
      }

      let complaint = await Complaint.findOneAndUpdate(
        { _id: complaintId },
        { address, image: findImage.image, description },
      );

      res.redirect(`/room/${userId}`);
    } catch (error) {
      res.send(error);
    }
  },
  deleteComplaint: async (req, res) => {
    try {
      let complaintId = req.params.complaintId;
      let userId = req.params.userId;
      let complaint = await Complaint.findOneAndDelete({ _id: complaintId });
      deleteImage(`./public/images/complaint-photos/${complaint.image}`);
      res.redirect(`/room/${userId}`);
    } catch (error) {
      res.send(error);
    }
  },
};
