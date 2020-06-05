const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { EmployeeModel } = require("../models");
const { getAge } = require("../helpers");

const ValidateDni = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newEmployee = materializedObject;
    const existingEmployee = await EmployeeModel.findOne({ name: newEmployee.dni });

    if (existingEmployee && existingEmployee._id != newEmployee.id) {
      throw new DuplicatedDniError(typeName);
    }
  }
};

class DuplicatedDniError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Dni is already assigned ",
      "Cant create an employee with the current dni"
    );
  }
}

const ValidateAge = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newEmployee = materializedObject;
    const age = getAge(newEmployee.birth_date);

    if (age < 18) {
      throw new EmployeeAgeError(typeName);
    }
  }
};

class EmployeeAgeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Invalid age, must be gerater than 18",
      "Cant create an employees with age under 18 years "
    );
  }
}

module.exports = {
  ValidateDni,
  ValidateAge
};
