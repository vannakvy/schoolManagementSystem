
const AcademicTermLabels = {
    docs: "academicTerms",
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
        totalAcademicTerm: async (_, { }, { AcademicTerm }) => {
            const total = await AcademicTerm.countDocuments({});
            return total;
        },
        allAcademicTerms: async (_, { }, { AcademicTerm }) => {
            const AcademicTerms = await AcademicTerm.find({});
            return AcademicTerms;
        },
        getAcademicTermsWithPagination: async (_, { page, limit, keyword }, { AcademicTerm }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: AcademicTermLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "createdBy schoolId academicYearId shiftId programId",
            };
            let query = {
                // $or: [

                //     { academicTermName: { $regex: keyword, $options: "i" } },
                // ],
            };

            const academicTerms = await AcademicTerm.paginate(query, options);

            return academicTerms;
        }
    },
    Mutation: {
        //@Desc create new AcademicTerm
        //@access auth
        createAcademicTerm: async (_, { newAcademicTerm }, { AcademicTerm }) => {
            try {
                console.log(AcademicTerm, newAcademicTerm)
                // const isExisted = await AcademicTerm.findOne({ AcademicTermName: newAcademicTerm.AcademicTermName });
                // if (isExisted) {
                //     return {
                //         message: "The AcademicTerm with this name is already exist",
                //         success: false
                //     }
                // }
                const academicTerms = new AcademicTerm(newAcademicTerm);
                const isCreated = await academicTerms.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create AcademicTerm",
                        success: false,
                    }
                }
                return {
                    message: "AcademicTerm created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create AcademicTerm Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the AcademicTerm
        //@access admin

        deleteAcademicTerm: async (_, { academicTermId }, { AcademicTerm }) => {
            try {
                const deletedInfo = await AcademicTerm.findByIdAndDelete(academicTermId);


                if (!deletedInfo) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "AcademicTerm deleted successfully"
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

        updateAcademicTerm: async (_, { academicTermId, newAcademicTerm }, { AcademicTerm }) => {
            try {
                const isUpdated = await AcademicTerm.findByIdAndUpdate(academicTermId, newAcademicTerm);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "AcademicTerm updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "AcademicTerm updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the AcademicTerm please contact the admin"
                }
            }
        }

    }
}