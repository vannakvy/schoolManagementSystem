import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
    totalClasses:Int!
        allClasses:[Classes!]!
        getClassesWithPagination(page:Int!,limit:Int,keyword:String):ClassesPaginator!
    }

    extend type Mutation{
    createCLasses(newClass:ClassesInput!):ClassResponse!
    updateCLasses(newClass:ClassesInput, classId:ID!):ClassResponse!
    deleteCLasses(classId:ID!):ClassResponse!
    }

    type Classes{
        _id:ID!
        className:String!
        note:String!
        classGroupId:ClassGroup
        gradeId:Grade
        createdBy:User
        shiftId:Shift
    }

    input ClassesInput{
        
        className:String!
        note:String!
        classGroupId:ID
        gradeId:ID
        createdBy:ID
        shiftId:ID
    }
    type ClassResponse{
        success:Boolean!
        message:String!
    }
    type ClassesPaginator{
        classes:[Classes!]!
        paginator:Paginator!
    }

`