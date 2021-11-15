
const BookshelfLabels = {
    docs: "bookShelf",
    limit: "perPage",
    nextPage: "next",
    prevPage: "prev",
    meta: "paginator",
    page: "currentPage",
    pagingCounter: "slNo",
    totalDocs: "totalDocs",
    totalPages: "totalPages",
};



export default {
    Query: {
        allBookShelf: async (_, { }, { BookShelf }) => {
            const bookShelves = await BookShelf.find({})
            return bookShelves
        },
        getBookShelfWithPagination: async (_, { page, limit, keyword }, { BookShelf }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: BookshelfLabels,
                sort: {
                    createdAt: -1
                },
                populate: "schoolId"

            }
            //query for the populate npm 
            const query = {
                // $or: [
                //     { programmName: { $regex: keyword, $options: "i" } },
                // ],
            }

            const bookShelf = await BookShelf.paginate(query, options);

            return bookShelf;
        }
    },
    Mutation: {
        //@Desc create new Classroom
        //@access auth
        createBookShelf: async (_, { newBookShelf }, { BookShelf }) => {
            try {
                const Existed = await BookShelf.findOne({ bookShelfName: newBookShelf.bookShelfName });
                if (Existed) {
                    return {
                        success: false,
                        message: "ធ្នើរសៀវភៅនេះមានក្នងប្រព័ន្ធហើយ"
                    }
                }
                const bookShelves = new BookShelf(newBookShelf);
                const created = bookShelves.save();
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

        //@Desc delete the Classroom
        //@access admin

        deleteBookShelf: async (_, { bookshelfId }, { BookShelf }) => {
            try {
                const deleted = await BookShelf.findByIdAndDelete(bookshelfId);


                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Book Shelf deleted successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Cannot delete this record please contact the admin"
                }
            }
        },

        //@Desc update the personal info
        //@access auth

        updateBookShelf: async (_, { bookShelfId, newBookShelf }, { BookShelf }) => {
            try {

                const isUpdated = await BookShelf.findByIdAndUpdate(bookShelfId, newBookShelf);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Book Shelf updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Book Shelf updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Book Shelf please contact the admin"
                }
            }
        }

    }
}