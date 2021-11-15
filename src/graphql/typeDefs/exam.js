import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
   totalExam:Int!
    allExams:[Exam!]!
    getExamsWithPagination(page:Int!,limit:Int,keyword:String):ExamPaginator!
    }

    extend type Mutation{
    createExam(newExam:ExamInput!):ExamResponse!
    updateExam(newExam:ExamInput!,examId:ID! ):ExamResponse!
    deleteExam(examId:ID!):ExamResponse!
    }

    type Exam{
        _id:ID!
        examDate:Date!
        remark:String,
        createdBy:ID!
    }
    input ExamInput{
        examDate:Date!
        remark:String,
    }
    type ExamResponse{
        success:Boolean!
        message:String!
    }
    type ExamPaginator{
        Exams:[Exam!]!
        paginator:Paginator!
    }

`