const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const {
  DepartmentModel,
  JobModel,
  DepartmentEmployeeModel,
  DepartmentManagerModel
} = require("../models");

const ValidateName = {
  validate: async function (typeName, originalObject, materializedObject) {
    const newDepartment = materializedObject;
    const existingDepartment = await DepartmentModel.findOne({
      name: newDepartment.name
    });

    if (existingDepartment && existingDepartment._id != newDepartment.id) {
      throw new DuplicatedNameError(typeName);
    }
  }
};

class DuplicatedNameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Name is already assigned to another department",
      "Cant create a new department with the current name"
    );
  }
}

const ValidateReferentialIntegrity = {
  validate: async function (typeName, originalObject, materializedObject) {
    const jobRelated = await JobModel.findOne({ department_id: originalObject });
    const employeeRelated = await DepartmentEmployeeModel.findOne({ department_id: originalObject });
    const departmentEmployeeRelated = await DepartmentEmployeeModel.findOne({ department_id: originalObject });
    const departmentManagerRelated = await DepartmentManagerModel.findOne({ department_id: originalObject });


    if (jobRelated || employeeRelated || departmentEmployeeRelated || departmentManagerRelated) {
      throw new ReferentialIntegrityError(typeName);
    }
  }
};
class ReferentialIntegrityError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Department is referenced in at least 1 other entity",
      "Cannot delete a department that is referenced in other entities"
    );
  }
}

const executeAuditableOnUpdating = async (objectId, modifiedObject) => {
  const promotionModel = gnx.getModel(PromotionType);
  return AuditableGraphQLObjectTypeController.onUpdating(
    objectId,
    modifiedObject,
    promotionModel
  );
};

module.exports = {
  ValidateName,
  ValidateReferentialIntegrity
};
