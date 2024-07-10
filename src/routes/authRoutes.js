const express = require("express");
const router = new express.Router();
const authController = require("../controllers/authController");

router.get("/logout", authController.logout);

module.exports = router;
