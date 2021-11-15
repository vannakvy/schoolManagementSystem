
const SchoolLabels = {
    docs: "schools",
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
        totalSchool: async (_, { }, { School }) => {
            const total = await School.countDocuments({});
            return total;
        },
        allSchools: async (_, { }, { School }) => {
            const schools = await School.find({});
            return schools;
        },
        getSchoolsWithPagination: async (_, { page, limit, keyword }, { School }) => {


            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: SchoolLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy",
            };
            let query = {
                $or: [
                    { schoolName: { $regex: keyword, $options: "i" } },
                    //   { commune: { $regex: keyword, $options: "i" } },
                    //   { district: { $regex: keyword, $options: "i" } },
                    //   { province: { $regex: keyword, $options: "i" } },
                ],
            };

            const schools = await School.paginate(query, options);
            return schools;
        }
    },
    Mutation: {
        //@Desc create new School
        //@access auth
        createSchool: async (_, { newSchool }, { School }) => {
            try {
                const isExisted = await School.findOne({ schoolName: newSchool.schoolName });
                if (isExisted) {
                    return {
                        message: "The School with this name is already exist",
                        success: false
                    }
                }
                const schools = new School(newSchool);
                const isCreated = await schools.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create School",
                        success: false,
                    }
                }
                return {
                    message: "School created successfully!",
                    success: true,
                }
            } catch (error) {
                return {
                    message: "Cannot create School Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the School
        //@access admin

        deleteSchool: async (_, { schoolId }, { School }) => {
            try {
                const deletedInfo = await School.findByIdAndDelete(schoolId);
                if (!deletedInfo) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "School deleted successfully"
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

        updateSchool: async (_, { schoolId, updatedSchool }, { School }) => {
            try {
                const isUpdated = await School.findByIdAndUpdate(schoolId, updatedSchool);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "School updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "School updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the School please contact the admin"
                }
            }
        }

    }
}