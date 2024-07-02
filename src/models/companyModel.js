const mongodb = require("../database");

async function getAllCompanies() {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("company")
      .find({})
      .toArray();
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "No company collection found error: " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

module.exports = {
  getAllCompanies,
};
