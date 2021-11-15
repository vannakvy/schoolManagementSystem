
const EnrollmentLabels = {
    docs: "enrollment",
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
        // totalSectionShift: async (_, { }, { SectionShift }) => {
        //     const total = await SectionShift.countDocuments({});
        //     return total;
        // },
        allEnrollment: async (_, { }, { Enrollment }) => {
            const enrollments = await Enrollment.find({});
            return enrollments;
        },
        getallEnrollment: async (_, { page, limit, keyword }, { Enrollment }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: EnrollmentLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy",
            };
            let query = {
                // $or: [

                //     { academicTermName: { $regex: keyword, $options: "i" } },
                // ],
            };

            const enrollment = await Enrollment.paginate(query, options);
            return enrollment;
        }
    },
    Mutation: {
        //@Desc create new AcademicTerm
        //@access auth
        createEnrollment: async (_, { newEnrollment }, { Enrollment }) => {
            try {
                // const isExisted = await Enrollment.findOne({ sectionShiftName: newSectionShift.sectionShiftName });
                // if (isExisted) {
                //     return {
                //         message: "The section shift is already exist",
                //         success: false
                //     }
                // }
                const enrollment = new Enrollment(newEnrollment);
                const isCreated = await enrollment.save();
                console.log(isCreated)
                if (!isCreated) {
                    return {
                        message: "Cannot create Enrollment",
                        success: false,
                    }
                }
                return {
                    message: "Enrollment created successfully!",
                    success: true,
                }
            } catch (error) {
                return {
                    message: "Cannot create Enrollment Please contact the admin" + error.message,
                    success: false,
                }
            }
        },

        //@Desc delete the AcademicTerm
        //@access admin

        deleteEnrollment: async (_, { enrollmentId }, { Enrollment }) => {
            try {
                const deleted = await Enrollment.findByIdAndDelete(enrollmentId);


                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Enrollment deleted successfully"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Cannot delete this record please contact the admin" + error.message,
                }
            }
        },

        //@Desc update the personal info
        //@access auth

        updateEnrollment: async (_, { enrollmentId, newEnrollment }, { Enrollment }) => {
            try {
                const isUpdated = await Enrollment.findByIdAndUpdate(enrollmentId, newEnrollment);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Enrollment updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Enrollment updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Enrollment please contact the admin" + error.message
                }
            }
        }

    }
}