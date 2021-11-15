import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
        totalSubject:Int!
        allSubjects:[Subject!]!
        getSubjectsWithPagination(page:Int,limit:Int,keyword:String):SubjectPaginator!

    }

    extend type Mutation{
    createSubject(newSubject:SubjectInput!):SubjectResponse!
    updateSubject(updatedSubject:SubjectInput!, subjectId:ID!):SubjectResponse!
    deleteSubject(subjectId:ID!):SubjectResponse!
    }

    type Subject{
        _id:ID!
        subjectName:String
        remark:String,
        createdBy:ID
        createdAt:Date
    }
    input SubjectInput{
        subjectName:String!
        remark:String
        createdBy:Int
    }
    type SubjectResponse{
        success:Boolean!
        message:String!
    }
    type SubjectPaginator{
         subjects:[Subject]!
        paginator:Paginator!
    }

`