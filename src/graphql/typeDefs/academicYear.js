import { gql } from "apollo-server-express";


export default gql`
    extend type Query{
        allAcademicYear:[AcademicYear!]!
    }

    extend type Mutation{
        createAcademicYear(newAcademic:AcademicYearInput!): AcademicResponse!
        updateAcademicYear(newAcademic:AcademicYearInput!,academicYearId:ID!): AcademicResponse!
        deleteAcademicYear(academicYearId:ID!): AcademicResponse
    }

    type AcademicYear{
        _id:ID!
        academicYear:String!
        status:Boolean!
        note:String
        schoolId:School!
    }
    input AcademicYearInput{
        academicYear:String!
        status:Boolean!
        note:String
        schoolId:ID!
    }
    type AcademicResponse{
        success:Boolean!
        message:String!
    }


`