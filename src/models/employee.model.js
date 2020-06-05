const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  hire_date: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

if (!EmployeeModel.collection.collection) {
  EmployeeModel.createCollection();
}

module.exports = EmployeeModel;
