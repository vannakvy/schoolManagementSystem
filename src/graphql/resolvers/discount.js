
const DiscountLabels = {
    docs: "discount",
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
        allDiscount: async (_, { }, { Discount }) => {
            const discount = await Discount.find({})
            return discount
        },
        getDiscountWithPagination: async (_, { page, limit, keyword }, { Discount }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: DiscountLabels,
                sort: {
                    createdAt: -1
                },
                populate: "schoolId"

            }
            //query for the populate npm 
            const query = {

            }
            const allDiscount = await Discount.paginate(query, options);
            return allDiscount;
        }
    },
    Mutation: {
        //@Desc create the exam 
        //@Desc admin 
        createDiscount: async (_, { newDiscount }, { Discount }) => {
            try {
                const discount = new Discount(newDiscount);
                const created = await discount.save()
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាច បង្កើតការបញ្ចុះតម្លៃបានទេ!"
                    }
                }
                return {
                    success: true,
                    message: "ការបញ្ចុះតម្លៃបានបង្កើតជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាច បង្កើតការបញ្ចុះតម្លៃបានទេ!" + error.message
                }
            }
        },

        //@Desc update the exam 
        //@Desc admin 
        updateDiscount: async (_, { discountId, newDiscount }, { Discount }) => {
            try {
                const existed = await Discount.findById(discountId)
                if (!existed) {
                    return {
                        success: false,
                        message: "This record does not existed"
                    }
                }
                const isUpdated = await Discount.findByIdAndUpdate(discountId, newDiscount);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Discount updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Discount updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the discount please contact the admin"
                }
            }
        },
        //@Desc delete the exam 
        //@Desc admin 
        deleteDiscount: async (_, { discountId }, { Discount }) => {
            const existed = await Discount.findById(discountId)
            if (!existed) {
                return {
                    success: false,
                    message: "មិនមានការបញ្ចុះតម្លៃប្រព័ន្ធយើងទេ"
                }
            }
            const deleted = await Discount.findByIdAndDelete(discountId)
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