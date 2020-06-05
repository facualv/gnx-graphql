const mongoose = require("mongoose");
const { Schema } = mongoose;

const SalarySchema = new Schema({
  employee_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  salary: {
    type: Number,
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

const SalaryModel = mongoose.model("salary", SalarySchema);

if (!SalaryModel.collection.collection) {
  SalaryModel.createCollection();
}

module.exports = SalaryModel;
