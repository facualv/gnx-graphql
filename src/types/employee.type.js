const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

const gnx = require("@simtlix/gnx");

const { EmployeeModel } = require("../models/");
const GenderEnumType = require("./enums//gender.types");
const { EmployeeValidator } = require("../validators/");

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  description: "Represent a specific employee",
  extensions: {
    validations: {
      CREATE: [EmployeeValidator.ValidateDni, EmployeeValidator.ValidateAge],
      UPDATE: [EmployeeValidator.ValidateDni, EmployeeValidator.ValidateAge],
      DELETE: [EmployeeValidator.ValidateReferentialIntegrity]
    }
  },
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    dni: { type: GraphQLNonNull(GraphQLInt) },
    birth_date: { type: GraphQLNonNull(GraphQLString) },
    hire_date: { type: GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLNonNull(GenderEnumType) }
  })
});

gnx.connect(EmployeeModel, EmployeeType, "employee", "employees");

module.exports = EmployeeType;
