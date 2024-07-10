const express = require("express");
const router = new express.Router();
const leadController = require("../controllers/leadController");
const leadValidate = require("../utils/lead-validation");
const isAuthenticated = require("../utils/auth").isAuthenticated;

router.get("/", leadController.getAllLeads);
router.get(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.checkData,
  leadController.getLeadById,
);
router.post(
  "/",
  isAuthenticated,
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  leadController.saveLead,
);
router.put(
  "/:id",
  isAuthenticated,
  leadValidate.addMongoIdRules(),
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  leadController.updateLead,
);
router.delete(
  "/:id",
  isAuthenticated,
  leadValidate.addMongoIdRules(),
  leadValidate.checkData,
  leadController.deleteLead,
);

module.exports = router;
