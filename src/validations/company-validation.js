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
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Invalid phone number"),
  body("address").trim().escape().notEmpty().withMessage("Address is required"),
  body("industry")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Industry is required"),
  body("founded")
    .trim()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Invalid founded date"),
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
