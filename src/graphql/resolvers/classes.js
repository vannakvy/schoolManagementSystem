
const ClassLabels = {
    docs: "classes",
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
        totalClasses: async (_, { }, { Classes }) => {
            const total = await Classes.countDocuments({});
            return total;
        },
        allClasses: async (_, { }, { Classes }) => {

            const classes = await Classes.find({});
            return classes;
        },
        getClassesWithPagination: async (_, { page, limit, keyword }, { Classes }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ClassLabels,
                sort: {
                    createdAt: -1,
                },
                // populate: "createdBy",
            };
            let query = {
                // $or: [

                //     { classroomName: { $regex: keyword, $options: "i" } },
                // ],
            };
            const classes = await Classes.paginate(query, options);
            return classes;
        }
    },
    Mutation: {
        //@Desc create new Class
        //@access auth
        createCLasses: async (_, { newClass }, { Classes }) => {
            try {
                const isExisted = await Classes.findOne({ className: newClass.className });
                if (isExisted) {
                    return {
                        message: "The Class with this name is already exist",
                        success: false
                    }
                }
                const classes = new Classes(newClass);
                const isCreated = await classes.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Class",
                        success: false,
                    }
                }
                return {
                    message: "Class created successfully!",
                    success: true,
                }
            } catch (error) {
                return {
                    message: "Cannot create Class Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Class
        //@access admin

        deleteCLasses: async (_, { classId }, { Classes }) => {
            try {
                const deleted = await Classes.findByIdAndDelete(classId);


                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Class deleted successfully"
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

        updateCLasses: async (_, { classId, newClass }, { Classes }) => {
            try {
                const isUpdated = await Classes.findByIdAndUpdate(classId, newClass);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Class updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Class updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Class please contact the admin"
                }
            }
        }

    }
}