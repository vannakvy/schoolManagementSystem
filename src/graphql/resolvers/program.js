const ProgramInfoLabels = {
    docs: "programs",
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
        allProgram: async (_, { }, { Program }) => {
            const program = await Program.find({})
            return program
        },
        allProgramWithPagination: async (_, { page, limit, keyword }, { Program }) => {

            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ProgramInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""

            }
            //query for the populate npm 
            const query = {
                $or: [
                    { programmName: { $regex: keyword, $options: "i" } },
                ],
            }

            const allProgram = await Program.paginate(query, options);

            return allProgram;
        }
    },
    Mutation: {
        //@Desc create the program 
        //@Desc admin 
        createProgramm: async (_, { newProgram }, { Program }) => {

            try {
                const { programmName } = newProgram;
                const existed = await Program.findOne({ programmName: programmName });
                if (existed) {
                    return {
                        success: false,
                        message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធនេះទេ!"
                    }
                }
                const program = new Program(newProgram)
                const created = await program.save();
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ជូលប្រូក្រាមបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បង្កើ់តប្រូក្រាមបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធនេះទេ!" + error.message
                }
            }
        },
        //@Desc update the program 
        //@Desc admin 
        updateProgramm: async (_, { newProgram, programId }, { Program }) => {

            try {

                const existed = await Program.findById(programId)

                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធនេះទេ"
                    }
                }
                const updated = await Program.findByIdAndUpdate(programId, newProgram);
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
        //@Desc delete the program 
        //@Desc admin 
        deleteProgramm: async (_, { programId }, { Program }) => {
            try {
                const existed = await Program.findById(programId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const deleted = await Program.findByIdAndDelete(programId)
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