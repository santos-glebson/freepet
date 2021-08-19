const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("signin", {
    title: "Sign In",
    bodyTitle: "Entrar",
    css: "styles/signin.css",
  });
});

router.post("/signin", userController.signin);

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    bodyTitle: "Cadastrar",
    css: "styles/signin.css",
  });
});

router.post("/signup", userController.signup);

module.exports = router;
