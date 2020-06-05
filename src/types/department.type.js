const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const gnx = require("@simtlix/gnx");

const { DepartmentModel } = require("../models/");
const { DepartmentValidator } = require("../validators/");

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent a specific department",
  extensions: {
    validations: {
      CREATE: [DepartmentValidator.ValidateName],
      UPDATE: [DepartmentValidator.ValidateName],
      DELETE: [DepartmentValidator.ValidateReferentialIntegrity]
    }
  },
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

gnx.connect(DepartmentModel, DepartmentType, "department", "departments");

module.exports = DepartmentType;
