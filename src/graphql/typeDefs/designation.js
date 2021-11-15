import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
        allDesignation:[Designation!]!
        getDesignationWithpaginations(page:Int!,limit:Int!,keyword:String!):DesignationPaginator!
    }
    extend type Mutation{
        createDesignation(newDesignation:DesignationInput!):DesignationResponse!
        updateDesignation(newDesignation:DesignationInput!, designationId:ID!):DesignationResponse!
        deleteDesignation(designationId:ID!):DesignationResponse
    }
    type Designation{
        _id:ID!,
       schoolId:School!,
       designation:String!
    }
    input DesignationInput{
        schoolId:ID!,
       designation:String!
    }
    type DesignationResponse{
        success:Boolean!
        message:String!
    }
    type DesignationPaginator{
        paginator:Paginator!
        grades:[Grade!]!
    }

`