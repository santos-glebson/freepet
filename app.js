const express = require("express");
const app = express();
const generalRoutes = require("./routes/generalRoutes");
const userRoutes = require("./routes/userRoutes");
const complaintsRoutes = require("./routes/complaintsRoutes");
const path = require("path");
const mongoose = require("mongoose");

// General Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", generalRoutes);
app.use("/room/", userRoutes);
app.use("/complaint/", complaintsRoutes);

// Mongoose Settings

mongoose
  .connect("mongodb://localhost/freepet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Run Node
app.listen(8000, () => {
  console.log("Node running on port 8000");
});
