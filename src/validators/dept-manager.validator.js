const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const ValidateDateInterval = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newDepartmentManager = materializedObject;

    if (newDepartmentManager.from_date <= newDepartmentManager.to_date) {
      throw new DateItervalError(typeName);
    }
  }
};

class DateItervalError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be smaller than to_date",
      "Cant create a new register with the current dates"
    );
  }
}

module.exports = {
  ValidateDateInterval
};
