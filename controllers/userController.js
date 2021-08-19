const User = require("../models/User");
const Complaints = require("../models/Complaint");
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  signin: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let user = await User.findOne({ email });
      let userId = user._id;
      if (!user) {
        return res.send("Usuário ou senha inválido");
      }

      const matchPassword = bcrypt.compareSync(password, user.password);
      if (!matchPassword) {
        return res.send("Usuário ou senha inválido");
      }
      res.redirect(`/room/${userId}`);
    } catch (error) {
      res.send(error);
    }
  },
  signup: async (req, res) => {
    try {
      let email = req.body.email;
      let password = bcrypt.hashSync(req.body.password, 10);
      let user = new User({ email, password });
      await user.save();
      res.redirect(`room/${user._id}`);
    } catch (error) {
      res.send(error);
    }
  },
  room: async (req, res) => {
    try {
      let userId = req.params.id;
      let currentDate = moment(new Date());
      let dateStart = moment(currentDate)
        .subtract(1, "year")
        .format("YYYY-MM-DD");

      let dateEnd = moment(currentDate).format("YYYY-MM-DD");
      let limit = 20;
      let {
        start = dateStart,
        end = dateEnd,
        order = -1,
        status = { $gt: -1, $lt: 2 },
        skip = 0,
      } = req.query;

      let complaints = await Complaints.find({
        userId,
        dateEnd: { $lt: end },
        dateStart: { $gt: start },
        status,
      })
        .sort({ dateStart: order })
        .limit(limit)
        .skip(skip * limit);

      let totalComplaints = await Complaints.find({
        userId,
        dateEnd: { $lt: end },
        dateStart: { $gt: start },
        status,
      });
      let pages = Math.ceil(totalComplaints.length / limit);
      let user = await User.findOne({ _id: userId });
      res.render("room", {
        title: "Sala",
        css: "../styles/room.css",
        user,
        complaints,
        start,
        end,
        order,
        status,
        skip,
        pages,
      });
    } catch (error) {
      res.send(error);
    }
  },
  profile: async (req, res) => {
    try {
      let userId = req.params.id;
      let user = await User.findOne({ _id: userId });
      res.render("profile", {
        title: "Perfil",
        css: "../../styles/profile.css",
        user,
      });
    } catch (error) {
      res.send(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      let userId = req.params.id;
      let name = req.body.name;
      if (name == "") {
        name = "Usuário(a)";
      }
      let { files } = req;
      let findImage = await User.findOne({ _id: userId });
      if (!files[0]) {
        findImage.image = findImage.image;
      } else {
        findImage.image = files[0].filename;
      }
      let user = await User.findOneAndUpdate(
        { _id: userId },
        { name, image: findImage.image },
      );
      res.redirect(`/room/${userId}`);
    } catch (error) {
      res.send(error);
    }
  },
};
