const BookLabels = {
    docs: "books",
    limit: "perPage",
    nextPage: "next",
    prevPage: "prev",
    meta: "paginator",
    page: "currentPage",
    pagingCounter: "slNo",
    totalPages: "totalPages",
};


export default {
    Query: {
        allBooks: async (_, { }, { Book }) => {
            const books = await Book.find({});
            return books;
        },
        getBookWithPagination: async (_, { page, limit, keyword }, { Book }) => {


            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: BookLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "schoolId bookCategoryId bookShelfId",
            };
            let query = {
                $or: [
                    { bookTitle: { $regex: keyword, $options: "i" } },
                ],
            };

            const book = await Book.paginate(query, options);
            return book;
        }
    },
    Mutation: {
        createBook: async (_, { newBook }, { Book }) => {
            try {
                const existed = await Book.findOne({ bookTitle: newBook.bookTitle });
                if (existed) {
                    return {
                        success: false,
                        message: "សៀវភៅនេះមានក្នងប្រព័ន្ធហើយ"
                    }
                }
                const book = new Book(newBook);
                const created = book.save();
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ចូលបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បញ្ចូលបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចបញ្ចូលបានទេ" + error.message
                }
            }
        },
        updateBook: async (_, { bookId, newBook }, { Book }) => {

            try {
                // const existed = Book.findById(bookId)
                // console.log(existed)
                // if (!existed) {
                //     return {
                //         success: false,
                //         message: "This record is not existed "
                //     }
                // }
                const updated = await Book.findByIdAndUpdate(bookId, newBook)

                if (!updated) {
                    return {
                        success: false,
                        message: 'Cannot update this record'
                    }
                }
                return {
                    success: true,
                    message: 'This record updated successful'
                }
            } catch (error) {
                return {
                    success: false,
                    message: "This record existed allready"
                }
            }
        },
        deleteBook: async (_, { bookId }, { Book }) => {
            try {
                const books = Book.findById(bookId)
                if (!books) {
                    return {
                        success: false,
                        message: "No record in this system"
                    }
                }
                const deleted = await Book.findByIdAndDelete(bookId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "Book Cannot delete"
                    }
                }
                return {
                    success: true,
                    message: "Book delete successsful"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "No record in this system" + error.message
                }
            }
        }
    }

}