
const GroupFeeLabels = {
    docs: "groupfees",
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

        allGroupFee: async (_, { }, { GroupFee }) => {

            const GroupFees = await GroupFee.find({});
            return GroupFees;
        },
        getGroupfeeWithPagination: async (_, { page, limit, keyword }, { GroupFee }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: GroupFeeLabels,
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

            const groupfees = await GroupFee.paginate(query, options);
            return groupfees;
        }
    },
    Mutation: {
        //@Desc create new AcademicTerm
        //@access auth
        createGroupFee: async (_, { newGroupFee }, { GroupFee }) => {
            try {
                // const isExisted = await AcademicTerm.findOne({ AcademicTermName: newAcademicTerm.AcademicTermName });
                // if (isExisted) {
                //     return {
                //         message: "The AcademicTerm with this name is already exist",
                //         success: false
                //     }
                // }
                const groupFees = new GroupFee(newGroupFee);
                const isCreated = await groupFees.save();
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

        deleteGroupFee: async (_, { groupFeeId }, { GroupFee }) => {
            try {
                const deleted = await GroupFee.findByIdAndDelete(groupFeeId);
                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Group Fee deleted successfully"
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

        updateGroupFee: async (_, { groupFeeId, newGroupFee }, { GroupFee }) => {
            try {
                const isUpdated = await GroupFee.findByIdAndUpdate(groupFeeId, newGroupFee);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Group Fee updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Group Fee updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update theGroup Fee please contact the admin"
                }
            }
        }

    }
}