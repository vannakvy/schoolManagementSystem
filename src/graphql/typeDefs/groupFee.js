import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
        allGroupFee:[GroupFee!]!
        getGroupfeeWithPagination(page:Int,limit:Int,keyword:String):GroupFeePaginator!
    }

    extend type Mutation{
    createGroupFee(newGroupFee:GroupFeeInput!):GroupFeeResponse!
    updateGroupFee(newGroupFee:GroupFeeInput, groupFeeId:ID!):GroupFeeResponse!
    deleteGroupFee(groupFeeId:ID!):GroupFeeResponse!
    }

    type GroupFee{
        _id:ID!
        groupFeeName:String!,
        academicYearCost:Float!,
        academicTermCost:Float!,
        quarterCost:Float!,
        monthCost:Float!,
        note: String,
        shiftId:Shift!
        programId:Program!
    }

    input GroupFeeInput{
        groupFeeName:String!,
        academicYearCost: Float!,
        academicTermCost:Float!,
        quarterCost:Float!,
        monthCost:Float!,
        note: String,
        shiftId:ID
        programId:ID
    }
    type GroupFeeResponse{
        success:Boolean!
        message:String!
    }
    type GroupFeePaginator{
        groupfees:[GroupFee!]!
        paginator:Paginator!
    }

`