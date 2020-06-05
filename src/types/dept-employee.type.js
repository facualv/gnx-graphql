const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const gnx = require("@simtlix/gnx");

const { EmployeeModel, DepartmentModel, DepartmentEmployeeModel } = require("../models/");
const { EmployeeType, DepartmentType } = require(".");
const { DepartmentEmployeeValidator } = require("../validators");

const DepartmentEmployeeType = new GraphQLObjectType({
  name: "DepartmentEmployeeType",
  description: "Represent a the department of an specific employee",
  extensions: {
    validations: {
      CREATE: [DepartmentEmployeeValidator.ValidateDateInterval],
      UPDATE: [DepartmentEmployeeValidator.ValidateDateInterval]
    }
  },
  fields: () => ({
    id: { type: GraphQLID },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          connectionField: "EmployeeID",
          embedded: true
        }
      },
      resolve(parent, args) {
        return EmployeeModel.findById(parent.EmployeeID);
      }
    },
    department: {
      type: DepartmentType,
      extensions: {
        relation: {
          connectionField: "DepartmentID",
          embedded: true
        }
      },
      resolve(parent, args) {
        return DepartmentModel.findById(parent.DepartmentID);
      }
    },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString }
  })
});

gnx.connect(
  DepartmentEmployeeModel,
  DepartmentEmployeeType,
  "EmployeeDepartment",
  "AllEmployeesDepartment"
);

module.exports = DepartmentEmployeeType;
