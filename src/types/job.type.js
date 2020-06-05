const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const gnx = require("@simtlix/gnx");

const { EmployeeModel, DepartmentModel, JobModel } = require("../models/");
const { EmployeeType, DepartmentType } = require(".");
const { JobValidator } = require("../validators");

const JobType = new GraphQLObjectType({
  name: "JobType",
  description: "Represent a specific job",
  extensions: {
    validations: {
      CREATE: [JobValidator.ValidateDateInterval],
      UPDATE: [JobValidator.ValidateDateInterval]
    }
  },
  fields: () => ({
    id: { type: GraphQLID },
    job_title: { type: GraphQLString },
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

gnx.connect(JobModel, JobType, "job", "jobs");

module.exports = JobType;
