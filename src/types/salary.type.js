const { GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLString } = require("graphql");

const gnx = require("@simtlix/gnx");

const { EmployeeModel, SalaryModel } = require("../models/");
const { EmployeeType } = require(".");
const { SalaryValidator } = require("../validators");

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represent a specific salary assigned to an employee",
  extensions: {
    validations: {
      CREATE: [SalaryValidator.ValidateDateInterval],
      UPDATE: [SalaryValidator.ValidateDateInterval]
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
    salary: { type: GraphQLFloat },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString }
  })
});

gnx.connect(SalaryModel, SalaryType, "salary", "salaries");

module.exports = SalaryType;
