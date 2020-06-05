const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentManagerSchema = new Schema({
  employee_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  department_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  from_date: {
    type: Date,
    required: true
  },
  to_date: {
    type: Date,
    required: true
  }
});

const DepartmentManagerModel = mongoose.model(
  "departmentManager",
  DepartmentManagerSchema
);

if (!DepartmentManagerModel.collection.collection) {
  DepartmentManagerModel.createCollection();
}

module.exports = DepartmentManagerModel;
