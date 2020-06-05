const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { JobModel } = require("../models");

const ValidateJobDateInterval = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newJob = materializedObject;

    if (newJob.from_date <= newJob.to_date) {
      throw new DateItervalError(typeName);
    }
  }
};

class DateItervalError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date mus be smaller than to date",
      "Cant create a new job with the current dates"
    );
  }
}

module.exports = {
  ValidateJobDateInterval
};
