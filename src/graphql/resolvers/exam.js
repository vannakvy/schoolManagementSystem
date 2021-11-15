

export default {
    Query: {
        allExams: async (_, { }, { Exam }) => {
            const exam = await Exam.find({})
            return exam
        },
        getExamsWithPagination: async (_, { page, limit, keyword }, { Exam }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ExamInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""

            }
            //query for the populate npm 
            const query = {

            }
            const allExams = await Exam.paginate(query, options);
            return allExams;
        }
    },
    Mutation: {
        //@Desc create the exam 
        //@Desc admin 
        createExam: async (_, { newExam }, { Exam }) => {
            try {
                const existedExam = await Exam.findOne({ examDate: newExam.examDate })
                if (!existedExam) {
                    return {
                        success: false,
                        message: "មិនមានការប្រឡងក្នងប្រព័ន្ធយើងទេ"
                    }
                }
                const exam = new Exam(newExam)
                const created = await exam.save();
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាចបង្កើតការប្រឡងបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បង្កើតការប្រឡងបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានការប្រឡងក្នងប្រព័ន្ធយើងទេ" + error.message
                }
            }
        },
        //@Desc update the exam 
        //@Desc admin 
        updateExam: async (_, { newExam, examId }, { Exam }) => {
            try {
                const existedExam = await Exam.findById(examId)
                if (!existedExam) {
                    return {
                        success: false,
                        message: "មិនមានការប្រឡងនៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const updated = await Exam.findByIdAndUpdate(examId, newExam)
                if (!updated) {
                    return {
                        success: false,
                        message: "កែប្រែការប្រឡងមិនបានជោគជ័យ!"
                    }
                }
                return {
                    success: true,
                    message: "កែប្រែការប្រឡងបានជោគជ័យ!"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានការប្រឡងនៅក្នុងប្រព័ន្ធយើងទេ" + error.message
                }
            }
        },
        //@Desc delete the exam 
        //@Desc admin 
        deleteExam: async (_, { examId }, { Exam }) => {
            const existedExam = await Exam.findById(examId)
            if (!existedExam) {
                return {
                    success: false,
                    message: "មិនមានការប្រឡងនៅក្នុងប្រព័ន្ធយើងទេ"
                }
            }
            const deleted = await Exam.findByIdAndDelete(examId)
            if (!deleted) {
                return {
                    success: false,
                    message: "ការលុបមិនបានជោគជ័យ!"
                }
            }
            return {
                success: true,
                message: "ការលុបបានជោគជ័យ!"
            }
        }
    }
}