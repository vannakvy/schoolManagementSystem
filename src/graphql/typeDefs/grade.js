import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
        allGrades:[Grade!]!
        getGradeWithpaginations(page:Int!,limit:Int!,keyword:String!):GradePaginator!
    }
    extend type Mutation{
        createGrade(newGrade:GradeInput!):GradeResponse!
        updateGrade(newGrade:GradeInput!, gradeId:ID!):GradeResponse!
        deleteGrade(gradeId:ID!):GradeResponse
    }
    type Grade{
        _id:ID!,
        gradeName:String!,
        remark:String,
        createdBy:User
        createdAt:Date!
    }
    input GradeInput{
        gradeName:String!,
        remark:String,
        createdBy:ID
    }
    type GradeResponse{
        success:Boolean!
        message:String!
    }
    type GradePaginator{
        paginator:Paginator!
        grades:[Grade!]!
    }

`