const express = require("express");
const router = new express.Router();
const campaignController = require("../controllers/campaignController");
const campaignValidate = require("../validations/campaign-validation");
const isAuthenticated = require("../utils/auth").isAuthenticated;

router.get("/", campaignController.getAllCampaigns);
router.post(
  "/",
  isAuthenticated,
  campaignValidate.addCampaignRules(),
  campaignValidate.checkData,
  campaignController.saveCampaign,
);
router.put(
  "/:id",
  isAuthenticated,
  campaignValidate.addMongoIdRules(),
  campaignValidate.addCampaignRules(),
  campaignValidate.checkData,
  campaignController.updateCampaign,
);
router.delete(
  "/:id",
  isAuthenticated,
  campaignValidate.addMongoIdRules(),
  campaignValidate.checkData,
  campaignController.deleteCampaign,
);

module.exports = router;
