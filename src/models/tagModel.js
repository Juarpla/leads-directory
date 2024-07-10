const mongodb = require("../database");

async function getAllTags() {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("tag")
      .find({})
      .toArray();
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "No tag collection found error: " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

async function saveTag(newTag) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("tag")
      .insertOne(newTag);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error: "Tag was not saved error " + arguments.callee.name + ", " + error,
    };
  }
}

async function updateTag(newTag, tagId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("tag")
      .replaceOne({ _id: tagId }, newTag);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Tag was not updated error " + arguments.callee.name + ", " + error,
    };
  }
}

async function deleteTag(tagId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("tag")
      .deleteOne({ _id: tagId });
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Tag was not deleted error " + arguments.callee.name + ", " + error,
    };
  }
}

module.exports = {
  getAllTags,
  saveTag,
  updateTag,
  deleteTag,
};
