const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentEmployeeSchema = new Schema({
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

const DepartmentEmployeeModel = mongoose.model("departmentEmployee", DepartmentEmployeeSchema);

if (!DepartmentEmployeeModel.collection.collection) {
   DepartmentEmployeeModel.createCollection();
}

module.exports = DepartmentEmployeeModel;
