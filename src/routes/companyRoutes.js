const express = require("express");
const router = new express.Router();
const companyController = require("../controllers/companyController");
const companyValidate = require("../validations/company-validation");
const isAuthenticated = require("../utils/auth").isAuthenticated;

router.get("/", companyController.getAllCompanies);
router.post(
  "/",
  isAuthenticated,
  companyValidate.addCompanyRules(),
  companyValidate.checkData,
  companyController.saveCompany,
);
router.put(
  "/:id",
  isAuthenticated,
  companyValidate.addMongoIdRules(),
  companyValidate.addCompanyRules(),
  companyValidate.checkData,
  companyController.updateCompany,
);
router.delete(
  "/:id",
  isAuthenticated,
  companyValidate.addMongoIdRules(),
  companyValidate.checkData,
  companyController.deleteCompany,
);

module.exports = router;
