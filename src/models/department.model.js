const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const DepartmentModel = mongoose.model("department", DepartmentSchema);

if (!DepartmentModel.collection.collection) {
  DepartmentModel.createCollection();
}

module.exports = DepartmentModel;
