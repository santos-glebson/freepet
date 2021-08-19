const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, minlength: 4, maxlength: 255 },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  name: { type: String, default: "Usuário(a)", maxlength: 50 },
  image: { type: String, default: "user.jpg" },
});

module.exports = mongoose.model("User", userSchema);
