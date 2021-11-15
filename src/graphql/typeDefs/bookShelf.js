import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allBookShelf:[BookShelf!]!
        getBookShelfWithPagination(page:Int!, limit:Int!, keyword:String):BookShelfPaginator!

    },
    extend type Mutation{
       createBookShelf(newBookShelf: BookShelfInput):ResposeBookShelf!
       updateBookShelf(newBookShelf: BookShelfInput, bookShelfId:ID!):ResposeBookShelf!
       deleteBookShelf(bookshelfId:ID!):ResposeBookShelf!
    }
    type BookShelf{
        _id:ID!
        schoolId:School!
        bookShelfName:String!
        floor:String!
        note:String!
    }
    input BookShelfInput{
        schoolId:ID
        bookShelfName:String!
        floor:String!
        note:String!
    }
    type ResposeBookShelf{
        success:Boolean!,
        message:String!
    }
    type BookShelfPaginator{
        bookShelf:[BookShelf!]!
        paginator:Paginator!
    }
`