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
  body("startDate")
    .trim()
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),
  body("endDate")
    .trim()
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),
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
