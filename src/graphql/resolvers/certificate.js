
const CertificateLabels = {
    docs: "buildings",
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
        allCertificate: async (_, { }, { Certificate }) => {

            const certificates = await Certificate.find({});
            return certificates;
        },
        getCertificateWithPagination: async (_, { page, limit, keyword }, { Certificate }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: ClassLabels,
                sort: {
                    createdAt: -1,
                },
                // populate: "createdBy",
            };
            let query = {
                // $or: [

                //     { classroomName: { $regex: keyword, $options: "i" } },
                // ],
            };
            const certificate = await Certificate.paginate(query, options);
            return certificate;
        }
    },
    Mutation: {
        //@Desc create new Building
        //@access auth
        createCertificate: async (_, { newCertificate }, { Certificate }) => {
            try {
                const isExisted = await Certificate.findOne({ certificateName: newCertificate.certificateName });
                if (isExisted) {
                    return {
                        message: "The Building with this name is already exist",
                        success: false
                    }
                }
                const certificate = new Certificate(newCertificate);
                const isCreated = await certificate.save();
                if (!isCreated) {
                    return {
                        message: "Cannot create Certificate",
                        success: false,
                    }
                }
                return {
                    message: "Certificate created successfully!",
                    success: true,

                }
            } catch (error) {
                return {
                    message: "Cannot create Certificate Please contact the admin",
                    success: false,
                }
            }
        },

        //@Desc delete the Building
        //@access admin

        deleteCertificate: async (_, { certificateId }, { Certificate }) => {
            try {
                const deleted = await Certificate.findByIdAndDelete(certificateId);


                if (!deleted) {
                    return {
                        success: false,
                        message: "cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Certificate deleted successfully"
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

        updateCertificate: async (_, { certificateId, newCertificate }, { Certificate }) => {
            try {
                const isUpdated = await Certificate.findByIdAndUpdate(certificateId, newCertificate);
                if (!isUpdated) {
                    return {
                        success: false,
                        message: "Certificate updated not successfully"
                    }
                }

                return {
                    success: true,
                    message: "Certificate updated successfully !"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "cannot update the Certificate please contact the admin"
                }
            }
        }

    }
}