const express = require("express");
const router = new express.Router();
const companyController = require("../controllers/companyController");
const util = require("../utils");

router.get("/", util.handleErrors(companyController.getAllCompanies));

module.exports = router;
