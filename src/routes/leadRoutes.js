const express = require("express");
const router = new express.Router();
const leadController = require("../controllers/leadController");
const leadValidate = require("../utils/lead-validation");

router.get("/", leadController.getAllLeads);
router.get(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.checkData,
  leadController.getLeadById,
);
router.post(
  "/",
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  leadController.saveLead,
);
router.put(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  leadController.updateLead,
);
router.delete(
  "/:id",
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  leadController.deleteLead,
);

module.exports = router;
