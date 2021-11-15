import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
#    totalExam:Int!
    allDiscount:[Discount!]!
    getDiscountWithPagination(page:Int,limit:Int,keyword:String):DiscountPaginator!
    }

    extend type Mutation{
        createDiscount(newDiscount: DiscountInput!):DiscountResponse!
        updateDiscount(newDiscount: DiscountInput!, discountId:ID!):DiscountResponse!
        deleteDiscount(discountId:ID!):DiscountResponse!
    }

    type Discount{
        _id:ID
        schoolId:School
        title:String
        amount:Float
        note:String
    }
    input DiscountInput{
        schoolId:ID
        title:String
        amount:Float
        note:String
    }
    type DiscountResponse{
        success:Boolean!
        message:String!
    }
    type DiscountPaginator{
        discount:[Discount!]!
        paginator:Paginator!
    }

`