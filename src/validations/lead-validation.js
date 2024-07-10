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

validate.addLeadRules = () => [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/)
    .withMessage("Invalid phone number format. Use +X-XXX-XXX-XXXX"),

  body("birthday")
    .trim()
    .notEmpty()
    .withMessage("Birthday is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .isBefore(new Date().toISOString())
    .withMessage("Birthday must be in the past"),

  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),

  body("occupation")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Occupation is required")
    .isString()
    .withMessage("Occupation must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Occupation must be between 2 and 100 characters"),

  body("companyId")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isMongoId()
    .withMessage("Invalid company ID format"),
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
