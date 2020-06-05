const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const ValidateDateInterval = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newSalary = materializedObject;

    if (newSalary.from_date <= newSalary.to_date) {
      throw new DateItervalError(typeName);
    }
  }
};

class DateItervalError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be smaller than to_date",
      "Cant create a new salary with the current dates"
    );
  }
}

module.exports = {
  ValidateDateInterval
};
