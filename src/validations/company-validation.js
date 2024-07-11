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

validate.addCompanyRules = () => [
  body("companyName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Company name is required"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),
  body("phone")
    .trim()
    .matches(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/)
    .withMessage("Invalid phone number format. Use +X-XXX-XXX-XXXX"),
  body("address").trim().escape().notEmpty().withMessage("Address is required"),
  body("industry")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Industry is required"),
  body("founded")
    .trim()
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .isBefore(new Date().toISOString())
    .withMessage("Date must be in the past"),
  body("numberOfEmployees")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Number of employees must be a positive integer"),
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
