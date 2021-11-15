import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allBookCategory:[BookCategory!]!
        getBookCategoryWithPagination(page:Int!, limit:Int!, keyword:String):BookCategoryPaginator!

    },
    extend type Mutation{
       createBookCategory(newBookCategory: BookCategoryInput):ResposeBookCategory!
       updateBookCategory(newBookCategory: BookCategoryInput, bookCategoryId:ID!):ResposeBookCategory!
       deleteBookCategory(bookCategoryId:ID!):ResposeBookCategory!
    }
    type BookCategory{
        _id:ID!
        schoolId:School!
        categoryName:String!
        note:String!
    }
    input BookCategoryInput{
        schoolId:ID!
        categoryName:String!
        note:String!
    }
    type ResposeBookCategory{
        success:Boolean!,
        message:String!
    }
    type BookCategoryPaginator{
        bookCategory:[BookCategory!]!
        paginator:Paginator!
    }
`