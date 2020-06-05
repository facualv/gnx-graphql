const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  job_title: {
    type: String,
    required: true
  },
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

const JobModel = mongoose.model("job", JobSchema);

if (!JobModel.collection.collection) {
  JobModel.createCollection();
}

module.exports = JobModel;
