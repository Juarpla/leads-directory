const { param, body, validationResult } = require("express-validator");

const validate = {};

validate.addMongoIdRules = () => [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID format"),
];

validate.addCampaignRules = () => [
  body("name").trim().escape().notEmpty().withMessage("Name is required"),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required"),
];

validate.checkData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
