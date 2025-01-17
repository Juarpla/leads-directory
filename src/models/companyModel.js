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

async function saveCompany(newCompany) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("company")
      .insertOne(newCompany);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Company was not saved error " + arguments.callee.name + ", " + error,
    };
  }
}

async function updateCompany(newCompany, companyId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("company")
      .replaceOne({ _id: companyId }, newCompany);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Company was not updated error " + arguments.callee.name + ", " + error,
    };
  }
}

async function deleteCompany(companyId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("company")
      .deleteOne({ _id: companyId });
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Company was not deleted error " + arguments.callee.name + ", " + error,
    };
  }
}

module.exports = {
  getAllCompanies,
  saveCompany,
  updateCompany,
  deleteCompany,
};
