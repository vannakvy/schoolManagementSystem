import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
        allVisitorInfo:[VisitorInfo!]!
        getVisitorInfoWithpaginations(page:Int,limit:Int,keyword:String):VisitorInfoPaginator!
    }
    extend type Mutation{
        createVisitorInfo(newVisitorInfo:VisitorInfoInput!):VisitorResponse!
        updateVisitorInfo(newVisitorInfo:VisitorInfoInput!, visitorInfoId:ID!):VisitorResponse!
        deleteVisitorInfo(visitorInfoId:ID!):VisitorResponse
    }
    type VisitorInfo{
        _id:ID!,
        schoolId:School!
        name:String
        phone:String
        comingFrom:String
        userId:User
        reason:String
        note:String

    }
    input VisitorInfoInput{
        schoolId:ID!
        name:String
        phone:String
        comingFrom:String
        userId:ID!
        reason:String
        note:String

    }
    type VisitorResponse{
        success:Boolean!
        message:String!
    }
    type VisitorInfoPaginator{
        paginator:Paginator!
        visitorInfo:[VisitorInfo!]!
    }

`