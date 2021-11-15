import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allProgram:[Program!]!
        allProgramWithPagination(page:Int, limit:Int, keyword: String):ProgrammPaginator!
    }
    extend type Mutation{
        createProgramm(newProgram:programmInput):ProgramResponses!
        updateProgramm(newProgram:programmInput, programId:ID):ProgramResponses!
        deleteProgramm(programId:ID):ProgramResponses!
    }
    type Program{
        _id:ID!
        programmName:String
        remark:String
        createdAt:Date
        school:School!
    }
    input programmInput{
        programmName:String!
        remark:String
        school:ID
    }
    type ProgramResponses{
        success:Boolean!
        message:String!
    }
    type ProgrammPaginator{
        paginator:Paginator!
        programs:[Program!]!
    }

`