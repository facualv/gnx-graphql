const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const gnx = require("@simtlix/gnx");

const { EmployeeModel, DepartmentModel, DepartmentManagerModel } = require("../models/");
const { EmployeeType, DepartmentType } = require(".");
const { DepartmentManagerValidator } = require("../validators");

const DepartmentManagerType = new GraphQLObjectType({
  name: "DepartmentManagerType",
  description: "Represent a the manager of an specific department",
  extensions: {
    validations: {
      CREATE: [DepartmentManagerValidator.ValidateDateInterval],
      UPDATE: [DepartmentManagerValidator.ValidateDateInterval]
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
  DepartmentManagerModel,
  DepartmentManagerType,
  "DepartmentManager",
  "AllDepartmentsManagers"
);

module.exports = DepartmentManagerType;
