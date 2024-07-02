const express = require("express");
const router = new express.Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.getAllCompanies);

module.exports = router;
