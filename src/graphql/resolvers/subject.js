
const SubjectLabels = {
    docs: "subjects",
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
        totalSubject: async (_, { }, { Subject }) => {
            const total = await Subject.countDocuments({});
            return total;
        },
        allSubjects: async (_, { }, { Subject }) => {
            const subjects = await Subject.find({});
            return subjects;
        },

        getSubjectsWithPagination: async (_, { page, limit, keyword }, { Subject }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: SubjectLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy",
            };
            let query = {
                $or: [
                    { subjectName: { $regex: keyword, $options: "i" } },
                ],
            };

            const subjects = await Subject.paginate(query, options);
            return subjects;
        }
    },
    Mutation: {
        //@Desc create new Subject
        //@access auth
        createSubject: async (_, { newSubject }, { Subject }) => {
            try {
                const { subjectName } = newSubject

                const isExisted = await Subject.findOne({ subjectName: subjectName });
                if (isExisted) {
                    return {
                        message: "The Subject with this name is already exist",
                        success: false
                    }
                }
                const subjects = new Subject(newSubject);
                const isCreated = await subjects.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Subject",
                        success: false,
                    }
                }
                return {
                    message: "Subject created successfully!",
                    success: true,
                }
            } catch (error) {
                return {
                    message: "Cannot create Subject Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Subject
        //@access admin

        deleteSubject: async (_, { subjectId }, { Subject }) => {
            try {
                const deletedInfo = await Subject.findByIdAndDelete(subjectId);

                if (!deletedInfo) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Subject deleted successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Cannot delete this record please contact the admin" + error.message
                }
            }
        },

        //@Desc update the personal info
        //@access auth

        updateSubject: async (_, { subjectId, updatedSubject }, { Subject }) => {
            try {
                const isUpdated = await Subject.findByIdAndUpdate(subjectId, updatedSubject);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Subject updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Subject updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Subject please contact the admin"
                }
            }
        }

    }
}