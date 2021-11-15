
const BookCategoryLabels = {
    docs: "bookCategory",
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
        allBookCategory: async (_, { }, { BookCategory }) => {
            const bookCategory = BookCategory.find({})
            return bookCategory
        },
        getBookCategoryWithPagination: async (_, { page, limit, keyword }, { BookCategory }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: BookCategoryLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "schoolId",
            };
            let query = {
                // $or: [
                //     { subjectName: { $regex: keyword, $options: "i" } },
                // ],
            };

            const bookCategory = await BookCategory.paginate(query, options);
            return bookCategory;
        }
    },
    Mutation: {
        createBookCategory: async (_, { newBookCategory }, { BookCategory }) => {
            try {
                const isExisted = await BookCategory.findOne({ categoryName: newBookCategory.categoryName });
                if (isExisted) {
                    return {
                        message: "The Book shelf with this name is already exist",
                        success: false
                    }
                }
                const bookCategories = new BookCategory(newBookCategory);
                const isCreated = await bookCategories.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Book Category",
                        success: false,
                    }
                }
                return {
                    message: "Book Category created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create Book Category Please contact the admin",
                    success: false,
                }
            }
        },
        updateBookCategory: async (_, { bookCategoryId, newBookCategory }, { BookCategory }) => {
            try {
                const bookCategories = BookCategory.findById(bookCategoryId)
                if (!bookCategories) {
                    return {
                        success: false,
                        message: "No record in this system"
                    }
                }
                const updated = await BookCategory.findOneAndUpdate(bookCategoryId, newBookCategory)
                if (!updated) {
                    return {
                        success: false,
                        message: "Book Category Cannot update"
                    }
                }
                return {
                    success: true,
                    message: "Book Category update successsful"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "No record in this system" + error.message
                }
            }
        },
        deleteBookCategory: async (_, { bookCategoryId }, { BookCategory }) => {
            try {
                const bookCategories = BookCategory.findById(bookCategoryId)
                if (!bookCategories) {
                    return {
                        success: false,
                        message: "No record in this system"
                    }
                }
                const deleted = await BookCategory.findByIdAndDelete(bookCategoryId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "Book Category Cannot delete"
                    }
                }
                return {
                    success: true,
                    message: "Book Category delete successsful"
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
