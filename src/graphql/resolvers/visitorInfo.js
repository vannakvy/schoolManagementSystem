
const VisitorInfoLabels = {
    docs: "visitorInfo",
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
        allVisitorInfo: async (_, { }, { VisitorInfo }) => {
            const visitorInfos = await VisitorInfo.find({})
            return visitorInfos
        },
        getVisitorInfoWithpaginations: async (_, { page, limit, keyword }, { VisitorInfo }) => {
            console.log(VisitorInfo)
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: VisitorInfoLabels,
                sort: {
                    createdAt: -1
                },
                populate: "schoolId userId"
            }
            //query for the populate npm 
            const query = {};
            const ab = await VisitorInfo.paginate(query, options).catch(err => {
                console.log(err, "dd")
            });
            return ab;
        }
    },
    Mutation: {
        createVisitorInfo: async (_, { newVisitorInfo }, { VisitorInfo }) => {
            try {

                // const existedGrade = await Grade.findOne({ gradeName: gradeName })
                // if (existedGrade) {
                //     return {
                //         success: false,
                //         message: "មិនមានថ្នាក់នៅក្នុងប្រព័ន្ធយើងទេ!"
                //     }
                // }
                const visitorInfo = new VisitorInfo(newVisitorInfo)
                const created = await visitorInfo.save();
                if (!created) {
                    return {
                        success: false,
                        message: "Cannot Create this record"
                    }
                }
                return {
                    success: true,
                    message: "This record created successful"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "Cannot Create this record" + error.mmessage
                }
            }
        },
        updateVisitorInfo: async (_, { visitorInfoId, newVisitorInfo }, { VisitorInfo }) => {
            try {
                const existed = await VisitorInfo.findById(visitorInfoId)
                if (existed) {
                    return {
                        success: true,
                        message: "Visitor Info aleady existed!"
                    }
                }
                const updated = await VisitorInfo.findOneAndUpdate(visitorInfoId, newVisitorInfo)
                if (!updated) {
                    return {
                        success: false,
                        message: "Cannot update this record!"
                    }
                }
                return {
                    success: true,
                    message: "Update this record successful!"
                }
            } catch (error) {
                return {
                    success: true,
                    message: "Visitor Info aleady existed!"
                }
            }
        },
        deleteVisitorInfo: async (_, { visitorInfoId }, { VisitorInfo }) => {
            const visitorInfo = VisitorInfo.findById(visitorInfoId)
            if (!visitorInfo) {
                return {
                    success: false,
                    message: "No this record!"
                }
            }
            const deleted = VisitorInfo.findByIdAndDelete(visitorInfoId)
            if (!deleted) {
                return {
                    success: false,
                    message: "Cannot delete this record"
                }
            }
            return {
                success: true,
                message: "Delete this record successful"
            }
        }
    }
}