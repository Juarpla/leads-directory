const express = require("express");
const router = new express.Router();
const tagController = require("../controllers/tagController");
const tagValidate = require("../validations/tag-validation");
const isAuthenticated = require("../utils/auth").isAuthenticated;

router.get("/", tagController.getAllTags);
router.post(
  "/",
  isAuthenticated,
  tagValidate.addTagRules(),
  tagValidate.checkData,
  tagController.saveTag,
);
router.put(
  "/:id",
  isAuthenticated,
  tagValidate.addMongoIdRules(),
  tagValidate.addTagRules(),
  tagValidate.checkData,
  tagController.updateTag,
);
router.delete(
  "/:id",
  isAuthenticated,
  tagValidate.addMongoIdRules(),
  tagValidate.checkData,
  tagController.deleteTag,
);

module.exports = router;
