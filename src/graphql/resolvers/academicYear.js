export default {
    Query: {
        allAcademicYear: async (_, { }, { AcademicYear }) => {
            const academicYears = await AcademicYear.find({});
            return academicYears;
        }
    },
    Mutation: {
        createAcademicYear: async (_, { newAcademic }, { AcademicYear }) => {
            try {

                const existed = await AcademicYear.findOne({ academicYear: newAcademic.academicYear });
                if (existed) {
                    return {
                        success: false,
                        message: "ឆ្នាំសិក្សានេះបានបង្កើតរួចហើយ"
                    }
                }

                const academicYear = new AcademicYear(newAcademic);
                const created = academicYear.save();
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាចបង្កើតបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បង្កើតបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "ឆ្នាំសិក្សានេះបានបង្កើតរួចហើយ"
                }
            }
        },
        updateAcademicYear: async (_, { newAcademic, academicYearId }, { AcademicYear }) => {

            try {

                const existed = await AcademicYear.findById(academicYearId)

                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានឆ្នាំសិក្សានៅក្នុងប្រព័ន្ធនេះទេ"
                    }
                }
                const updated = await AcademicYear.findByIdAndUpdate(academicYearId, newAcademic);
                if (!updated) {
                    return {
                        success: false,
                        message: "មិនអាចកែប្រែបានទេ!"
                    }
                }
                return {
                    success: true,
                    message: "កែប្រែបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចបង្កើតប្រូក្រាមបានទេ" + error.message
                }
            }
        },

        deleteAcademicYear: async (_, { academicYearId }, { AcademicYear }) => {
            try {
                const existed = await AcademicYear.findById(academicYearId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const deleted = await AcademicYear.findByIdAndDelete(academicYearId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "មិនអាចលុបប្រូក្រាមបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុបប្រូក្រាមបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        }
    }


}