const SalaryGradeInfoLabels = {
    docs: "SalaryGrades",
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
        allSalaryGrades: async (_, { }, { SalaryGrade }) => {
            const salaryGrade = await SalaryGrade.find({})
            return salaryGrade
        },
        getSalaryGradeWithpaginations: async (_, { page, limit, keyword }, { SalaryGrade }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: SalaryGradeInfoLabels,
                sort: {
                    createdAt: -1
                },
                populate: "schoolId shiftId"

            }
            //query for the populate npm 
            const query = {

            }
            const allSalaryGrades = await SalaryGrade.paginate(query, options);
            return allSalaryGrades;
        }
    },
    Mutation: {
        //@Desc create the SalaryGrade
        //@Desc admin 
        createSalaryGrade: async (_, { newSalaryGrade }, { SalaryGrade }) => {
            try {
                const existed = await SalaryGrade.findOne({ gradeName: newSalaryGrade.gradeName })

                if (existed) {
                    return {
                        success: false,
                        message: "This record  existed"
                    }
                }
                const salaryGrade = new SalaryGrade(newSalaryGrade)
                const created = salaryGrade.save()
                if (!created) {
                    return {
                        success: false,
                        message: "Cannot Create this record"
                    }
                }
                return {
                    success: true,
                    message: "Create this record successfully"
                }
            } catch ({ error }) {
                return {
                    success: false,
                    message: "This record not existed" + error.message
                }
            }
        },
        //@Desc update the SalaryGrade
        //@Desc admin 
        updateSalaryGrade: async (_, { salaryGradeId, newSalaryGrade }, { SalaryGrade }) => {
            try {
                const existed = SalaryGrade.findById(salaryGradeId)
                if (!existed) {
                    return {
                        success: false,
                        message: "This record does not existed "
                    }
                }
                const isUpdated = await SalaryGrade.findByIdAndUpdate(salaryGradeId, newSalaryGrade);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Salary Grade updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Salary Grade updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Salary Grade please contact the admin" + error.message
                }
            }
        },
        //@Desc delete the SalaryGrade 
        //@Desc admin 
        deleteSalaryGrade: async (_, { salaryGradeId }, { SalaryGrade }) => {
            try {
                const existedSalaryGrade = await SalaryGrade.findById(salaryGradeId)
                if (!existedSalaryGrade) {
                    return {
                        success: false,
                        message: "មិនមាននៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleted = await SalaryGrade.findByIdAndDelete(salaryGradeId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "Salary Grade មិនអាចលុបបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុប Salary Grade បានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមាន Salary Grade ក្នុងប្រព័ន្ធយើងទេ" + error.message
                }
            }

        }
    }
}