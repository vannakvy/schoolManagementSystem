
const ClassroomLabels = {
    docs: "classrooms",
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
        totalClassroom: async (_, { }, { Classroom }) => {
            const total = await Classroom.countDocuments({});
            return total;
        },
        allClassrooms: async (_, { }, { Classroom }) => {

            const classrooms = await Classroom.find({});
            return classrooms;
        },
        getClassroomsWithPagination: async (_, { page, limit, keyword }, { Classroom }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ClassroomLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy",
            };
            let query = {
                $or: [

                    { classroomName: { $regex: keyword, $options: "i" } },
                ],
            };

            const classrooms = await Classroom.paginate(query, options);
            return classrooms;
        }
    },
    Mutation: {
        //@Desc create new Classroom
        //@access auth
        createClassroom: async (_, { newClassroom }, { Classroom }) => {
            try {
                const isExisted = await Classroom.findOne({ classroomName: newClassroom.classroomName });
                if (isExisted) {
                    return {
                        message: "The Classroom with this name is already exist",
                        success: false
                    }
                }
                const classrooms = new Classroom(newClassroom);
                const isCreated = await classrooms.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Classroom",
                        success: false,
                    }
                }
                return {
                    message: "Classroom created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create Classroom Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Classroom
        //@access admin

        deleteClassroom: async (_, { classroomId }, { Classroom }) => {
            try {
                const deletedInfo = await Classroom.findByIdAndDelete(classroomId);


                if (!deletedInfo) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Classroom deleted successfully"
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

        updateClassroom: async (_, { classroomId, newClassroom }, { Classroom }) => {
            try {

                const isUpdated = await Classroom.findByIdAndUpdate(classroomId, newClassroom);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Classroom updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Classroom updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Classroom please contact the admin"
                }
            }
        }

    }
}