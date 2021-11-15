import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allShift:[Shift!]!
        getShiftWithPagination(page:Int, limit:Int, keyword:String):ShiftPaginator
    }

    extend type Mutation{
        createShift(newShift:ShiftInput!): ShiftResponse!
        updateShift(newShift:ShiftInput!,shiftId:ID!): ShiftResponse!
        deleteShift(shiftId:ID!): ShiftResponse!
    }

    type Shift{
        _id:ID!
        shiftName:String!
        note:String
        createdBy:User
    }
    input ShiftInput{
        shiftName:String!
        note:String
        createdBy:ID
    }
    type ShiftResponse{
        success:Boolean!
        message:String!
    }
    type ShiftPaginator{
        shift:[Shift!]!
        paginator:Paginator
    }


`