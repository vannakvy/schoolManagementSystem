const GradeInfoLabels = {
    docs: "grades",
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
        allGrades: async (_, { }, { Grade }) => {
            const grade = await Grade.find({})
            return grade
        },
        getGradeWithpaginations: async (_, { page, limit, keyword }, { Grade }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: GradeInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""

            }
            //query for the populate npm 
            const query = {

            }
            const allGrades = await Grade.paginate(query, options);
            return allGrades;
        }
    },
    Mutation: {
        //@Desc create the grade
        //@Desc admin 
        createGrade: async (_, { newGrade }, { Grade }) => {
            try {
                const { gradeName } = newGrade
                const existedGrade = await Grade.findOne({ gradeName: gradeName })
                if (existedGrade) {
                    return {
                        success: false,
                        message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const grade = new Grade(newGrade)
                const created = await grade.save();
                if (!created) {
                    return {
                        success: false,
                        message: "ការបង្កើតថ្នាក់មិនបានជោគជ័យ"
                    }
                }
                return {
                    success: true,
                    message: "ការបង្កើតថ្នាក់បានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        },
        //@Desc update the grade
        //@Desc admin 
        updateGrade: async (_, { gradeId, newGrade }, { Grade }) => {
            try {
                const existedGrade = await Grade.findById(gradeId)
                if (!existedGrade) {
                    return {
                        success: false,
                        message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const updated = await Grade.findByIdAndUpdate(gradeId, newGrade)
                if (!updated) {
                    return {
                        success: false,
                        message: "ថ្នាក់មិនអាចកែប្រែបាន"
                    }
                }
                return {
                    success: true,
                    message: "ថ្នាក់កែប្រែបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        },
        //@Desc delete the grade 
        //@Desc admin 
        deleteGrade: async (_, { gradeId }, { Grade }) => {
            try {
                const existedGrade = await Grade.findById(gradeId)
                if (!existedGrade) {
                    return {
                        success: false,
                        message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleted = await Grade.findByIdAndDelete(gradeId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "ថ្នាក់មិនអាចលុបបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុបថ្នាក់រៀនបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ" + error.mmessage
                }
            }

        }
    }
}