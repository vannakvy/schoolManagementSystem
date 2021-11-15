import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
        allBooks:[Book!]!
        getBookWithPagination(page:Int, limit:Int, keyword:String):BookPaginator!
    }

    extend type Mutation{
        createBook(newBook:BookInput!):BookResponse!
        updateBook(newBook:BookInput!,bookId:ID! ):BookResponse!
        deleteBook(bookId:ID!):BookResponse!
    }

   

    type Book{
        _id:ID!
        schoolId:School
        donateBy:String
        bookTitle:String
        bookCategoryId:BookCategory
        bookShelfId:BookShelf
        addingDate:Date
        bookID:String
        isbnNo:String
        edition:String
        author:String
        language:String
        price:Float
        quantity:Int
        book_image:String

    }
    input BookInput{
        schoolId:ID
        donateBy:String
        bookTitle:String
        bookCategoryId:ID
        bookShelfId:ID
        addingDate:Date
        bookID:String
        isbnNo:String
        edition:String
        author:String
        language:String
        price:Float
        quantity:Int
        book_image:String
    }
    type BookResponse{
        success:Boolean!
        message:String!
    }
    type BookPaginator{
        books:[Book!]!
        paginator:Paginator!
    }

`