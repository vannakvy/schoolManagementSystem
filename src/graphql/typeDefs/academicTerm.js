import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
        totalAcademicTerm:Int!
        allAcademicTerms:[AcademicTerm!]!
        getAcademicTermsWithPagination(page:Int!,limit:Int!,keyword:String):AcademicTermPaginator!
    }

    extend type Mutation{
    createAcademicTerm(newAcademicTerm:AcademicTermInput!):AcademicTermResponse!
    updateAcademicTerm(newAcademicTerm:AcademicTermInput!,academicTermId:ID! ):AcademicTermResponse!
    deleteAcademicTerm(academicTermId:ID!):AcademicTermResponse!
    }

   

    type AcademicTerm{
        _id:ID!
        schoolId:School
        academicYearId:AcademicYear
        generationNumber:Int
        shiftId:Shift
        programId:Program
        quarter:[Quarter]!
        start:Date
        end:Date
        createdBy:User
        name:String
    }
    type Quarter{
        name:String!
        startDate:Date!
        endDate:Date!
    }
    input QuarterInput{
        name:String!
        startDate:Date!
        endDate:Date!
    }
    input AcademicTermInput{
        schoolId:ID!
        academicYearId:ID!
        generationNumber:Int
        shiftId:ID
        programId:ID
        quarter:[QuarterInput]
        start:Date!
        end:Date!
        createdBy:ID
        name:String!
    }
    type AcademicTermResponse{
        success:Boolean!
        message:String!
    }
    type AcademicTermPaginator{
        academicTerms:[AcademicTerm!]!
        paginator:Paginator!
    }

`