const express = require("express");
const router = new express.Router();
const leadController = require("../controllers/leadController");

router.get("/", leadController.getAllLeads);
router.post("/", leadController.saveLead);

module.exports = router;