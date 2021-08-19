const mongoose = require("mongoose");
const moment = require("moment");

const complaintSchema = new mongoose.Schema({
  address: {
    type: String,
    default: "Usuário(a)",
    maxlength: 100,
    required: true,
  },
  image: { type: String, default: "complaint-bg.svg", required: true },
  userId: { type: String },
  status: { type: Number, default: 0 },
  formatedDate: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Complaint", complaintSchema);
