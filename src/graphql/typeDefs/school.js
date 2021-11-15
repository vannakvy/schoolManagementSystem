import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
   totalSchool:Int!
    allSchools:[School!]!
    getSchoolsWithPagination(page:Int!,limit:Int,keyword:String):SchoolPaginator!
    }

    extend type Mutation{
    createSchool(newSchool:SchoolInput!):SchoolResponse!
    updateSchool(updatedSchool:SchoolInput, schoolId:ID!):SchoolResponse!
    deleteSchool(schoolId:ID!):SchoolResponse!
    }

    type School{
        _id:ID!
        schoolName:String,
        village:String,
        commune:String,
        district:String,
        province:String,
        numberOfRoom:Int,
        remark:String,
        createdBy:ID
    }
    input SchoolInput{
        schoolName:String
        village:String
        commune:String
        district:String
        province:String
        numberOfRoom:Int
        remark:String
        createdBy:Int
    }
    type SchoolResponse{
        success:Boolean
        message:String
    }
    type SchoolPaginator{
        schools:[School!]!
        paginator:Paginator!
    }

`