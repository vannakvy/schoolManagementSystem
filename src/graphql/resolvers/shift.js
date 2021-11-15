const ShiftLabels = {
    docs: "shift",
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
        allShift: async (_, { }, { Shift }) => {
            const shifts = await Shift.find({});
            return shifts;
        },
        getShiftWithPagination: async (_, { page, limit, keyword }, { Shift }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ShiftLabels,
                sort: {
                    createdAt: -1
                },
                populate: "createdBy"

            }
            //query for the populate npm 
            const query = {

            }
            const allShift = await Shift.paginate(query, options);
            return allShift;
        }
    },
    Mutation: {
        createShift: async (_, { newShift }, { Shift }) => {
            try {
                console.log(newShift)
                const existed = await Shift.findOne({ shiftName: newShift.shiftName });
                console.log(existed)
                if (existed) {
                    return {
                        success: false,
                        message: "ឆ្នាំសិក្សានេះបានបង្កើតរួចហើយ"
                    }
                }

                const shifts = new Shift(newShift);
                const created = shifts.save();
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
                    message: "ឆ្នាំសិក្សានេះបានបង្កើតរួចហើយ" + error.message
                }
            }
        },
        updateShift: async (_, { newShift, shiftId }, { Shift }) => {

            try {

                const existed = await Shift.findById(shiftId)

                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានឆ្នាំសិក្សានៅក្នុងប្រព័ន្ធនេះទេ"
                    }
                }
                const updated = await Shift.findByIdAndUpdate(shiftId, newShift);
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

        deleteShift: async (_, { shiftId }, { Shift }) => {
            try {
                const existed = await Shift.findById(shiftId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានប្រូក្រាមនៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const deleted = await Shift.findByIdAndDelete(shiftId)
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