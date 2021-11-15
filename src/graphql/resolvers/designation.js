const DesignationInfoLabels = {
    docs: "designation",
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
        allDesignation: async (_, { }, { Designation }) => {
            const designation = await Designation.find({})
            return designation
        },
        getDesignationWithpaginations: async (_, { page, limit, keyword }, { Designation }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: DesignationInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""

            }
            //query for the populate npm 
            const query = {

            }
            const designation = await Designation.paginate(query, options);
            return designation;
        }
    },
    Mutation: {
        //@Desc create the grade
        //@Desc admin 
        createDesignation: async (_, { newDesignation }, { Designation }) => {
            try {
                const { designation } = newDesignation
                const existed = await Designation.findOne({ designation: designation })
                if (existed) {
                    return {
                        success: false,
                        message: "មិនមានDesignationក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const designation = new Designation(newGrade)
                const created = await designation.save();
                if (!created) {
                    return {
                        success: false,
                        message: "ការបង្កើតDesignationមិនបានជោគជ័យ"
                    }
                }
                return {
                    success: true,
                    message: "ការបង្កើតDesignationបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានDesignationនៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        },
        //@Desc update the grade
        //@Desc admin 
        updateDesignation: async (_, { designationId, newDesignation }, { Designation }) => {
            try {
                const existed = await Designation.findById(designationId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានDesignationនៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const updated = await Designation.findByIdAndUpdate(designationId, newDesignation)
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
                    message: "មិនមានDesignationនៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        },
        //@Desc delete the grade 
        //@Desc admin 
        deleteDesignation: async (_, { designationId }, { Designation }) => {
            try {
                const existed = await Designation.findById(designationId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានDesignationនៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleted = await Designation.findByIdAndDelete(designationId)
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