
const ClassGroupLabels = {
    docs: "classGroup",
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
        allClassGroup: async (_, { }, { ClassGroup }) => {

            const classesGroup = await ClassGroup.find({});
            return classesGroup;
        },
        getClassGroupWithpaginations: async (_, { page, limit, keyword }, { ClassGroup }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ClassGroupLabels,
                // sort: {
                //     createdAt: -1,
                // },
                // populate: "createdBy",
            };
            let query = {
                // $or: [

                //     { classroomName: { $regex: keyword, $options: "i" } },
                // ],
            };
            const classGroup = await ClassGroup.paginate(query, options);
            return classGroup;
        }
    },
    Mutation: {
        //@Desc create new Classroom
        //@access auth
        createClassGroup: async (_, { newClassGroup }, { ClassGroup }) => {
            try {
                const isExisted = await ClassGroup.findOne({ classGroupName: newClassGroup.classGroupName });
                if (isExisted) {
                    return {
                        message: "The ClassGroup with this name is already exist",
                        success: false
                    }
                }
                const classGroup = new ClassGroup(newClassGroup);
                const isCreated = await classGroup.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Class Group",
                        success: false,
                    }
                }
                return {
                    message: "Class Group created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create Class Group Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Classroom
        //@access admin

        deleteClassGroup: async (_, { classGroupId }, { ClassGroup }) => {
            try {
                const deleted = await ClassGroup.findByIdAndDelete(classGroupId);


                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "ClassGroup deleted successfully"
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

        updateClassGroup: async (_, { classGroupId, newClassGroup }, { ClassGroup }) => {
            try {

                const isUpdated = await ClassGroup.findByIdAndUpdate(classGroupId, newClassGroup);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Classroom updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Class Group updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Class Group please contact the admin"
                }
            }
        }

    }
}