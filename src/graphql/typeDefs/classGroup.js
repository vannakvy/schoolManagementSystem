import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
        allClassGroup:[ClassGroup!]!
        getClassGroupWithpaginations(page:Int,limit:Int,keyword:String):ClassGroupPaginator!
    }

    extend type Mutation{
    createClassGroup(newClassGroup:ClassGroupInput!):ClassGroupResponse!
    updateClassGroup(newClassGroup:ClassGroupInput,classGroupId:ID!):ClassGroupResponse!
    deleteClassGroup(classGroupId:ID!):ClassGroupResponse!
    }

    type ClassGroup{
         _id:ID
        programId:Program
        schoolId:School
        classGroupName:String
        code:String
    }

    input ClassGroupInput{
        programId:ID
        schoolId:ID
        classGroupName:String!
        code:String!
    }
    type ClassGroupResponse{
        success:Boolean
        message:String
    }
    type ClassGroupPaginator{
        classGroup:[ClassGroup!]!
        paginator:Paginator!
    }

`