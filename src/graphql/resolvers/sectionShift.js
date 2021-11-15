
const SectionShiftLabels = {
    docs: "sectionShift",
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
        allSectionShift: async (_, { }, { SectionShift }) => {
            const sectionShift = await SectionShift.find({});
            return sectionShift;
        },
        getSectionShiftWithPagination: async (_, { page, limit, keyword }, { SectionShift }) => {


            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: SectionShiftLabels,
                sort: {
                    createdAt: -1,
                },
                populate: "schoolId academicYearId shiftId programId gradeId classId classroomId personalInfoId sectionTypeId",
            };
            let query = {
                // $or: [

                //     { academicTermName: { $regex: keyword, $options: "i" } },
                // ],
            };

            const sectionShift = await SectionShift.paginate(query, options);
            return sectionShift;
        }
    },
    Mutation: {
        //@Desc create new AcademicTerm
        //@access auth
        createSectionShift: async (_, { newSectionShift }, { SectionShift }) => {
            console.log(newSectionShift)
            try {

                const { sectionShiftName } = newSectionShift
                const existed = await SectionShift.findOne({ sectionShiftName: sectionShiftName })
                if (existed) {
                    return {
                        success: false,
                        message: "មានរួចហើយ!"
                    }
                }
                const sectionShift = new SectionShift(newSectionShift)
                const created = await sectionShift.save();
                if (!created) {
                    return {
                        success: false,
                        message: "ការបង្កើតមិនបានជោគជ័យ"
                    }
                }
                return {
                    success: true,
                    message: "ការបង្កើតបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    message: "Cannot create Section Shift Please contact the admin" + error.message,
                    success: false,
                }
            }
        },

        //@Desc delete the AcademicTerm
        //@access admin

        deleteSectionShift: async (_, { sectionShiftId }, { SectionShift }) => {
            try {
                const deletedSectionShift = await SectionShift.findByIdAndDelete(sectionShiftId);


                if (!deletedSectionShift) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Section Shift deleted successfully"
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

        updateSectionShift: async (_, { sectionShiftId, newSectionShift }, { SectionShift }) => {
            try {
                const isUpdated = await SectionShift.findByIdAndUpdate(sectionShiftId, newSectionShift);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Section Shift updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Section Shift updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Section Shift please contact the admin"
                }
            }
        }

    }
}