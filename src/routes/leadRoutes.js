const express = require("express");
const router = new express.Router();
const leadController = require("../controllers/leadController");
const leadValidate = require("../utils/lead-validation");
const util = require("../utils");

router.get("/", util.handleErrors(leadController.getAllLeads));
router.get(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.checkData,
  util.handleErrors(leadController.getLeadById),
);
router.post(
  "/",
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  util.handleErrors(leadController.saveLead),
);
router.put(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.addLeadRules(),
  leadValidate.checkData,
  util.handleErrors(leadController.updateLead),
);
router.delete(
  "/:id",
  leadValidate.addMongoIdRules(),
  leadValidate.checkData,
  util.handleErrors(leadController.deleteLead),
);

module.exports = router;
