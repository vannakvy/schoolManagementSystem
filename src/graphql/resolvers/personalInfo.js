
const PersonalInfoLabels = {
    docs: "personalInfos",
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
        //@Desc get all the personalInfos
        //@Desc authenticated 
        allPersonalInfos: async (_, { }, { PersonalInfo }) => {
            const personalInfos = await PersonalInfo.find({});
            return personalInfos;
        },
        //@Desc get all the personalInfos
        //@Desc authenticated 
        getPersonalInfoWithPagination: async (_, { page, limit }, { PersonalInfo }) => {
            //options for the populate npm 
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""
            }

            //query for the populate npm 
            const query = {

            }

            const personalInfos = await PersonalInfo.paginate(query, options);

            return personalInfos;
        },

        //@Desc get all teacher with pagination
        //@Desc authenticated 
        getTeacherWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            //options for the populate npm 
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
                // populate:""
            }

            //query for the populate npm 
            const query = {
                role: "គ្រូ",
                $or: [
                    { firstName: { $regex: keyword, $options: "i" } },
                    { lastName: { $regex: keyword, $options: "i" } },
                ],
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos;
        },

        //@Desc get all student with pagination
        //@Desc authenticated 
        getStudentWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            const query = {
                role: "សិស្ស",
                $or: [
                    { firstName: { $regex: keyword, $options: "i" } },
                    { lastName: { $regex: keyword, $options: "i" } },

                ],
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },

        //@Desc get all staff with pagination
        //@Desc authenticated 
        getStaffWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            const query = {
                role: "បុគ្គលិក",
                $or: [
                    { firstName: { $regex: keyword, $options: "i" } },
                    { lastName: { $regex: keyword, $options: "i" } },

                ],
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },


        //@Desc get all gardain with pagination
        //@Desc authenticated 
        getGardianWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            const query = {
                role: "អាណាព្យាបាល",
                $or: [
                    { firstName: { $regex: keyword, $options: "i" } },
                    { lastName: { $regex: keyword, $options: "i" } },

                ],
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },

        //@Desc get all guess with pagination
        //@Desc authenticated 
        getGuessWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            const query = {
                role: "ភ្ញៀវ"
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },
        //@Desc get all others with pagination
        //@Desc authenticated 
        getOthersWithPagination: async (_, { page, limit }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            const query = {
                role: "ផ្សេងៗ"
            }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },
        getEnrollmentWithPagination: async (_, { page, limit, keyword }, { PersonalInfo }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: PersonalInfoLabels,
                sort: {
                    createdAt: -1
                },
            }
            // const query = {
            //     role: "ផ្សេងៗ"
            // }
            const personalInfos = await PersonalInfo.paginate(query, options);
            return personalInfos
        },


    },

    Mutation: {
        //@Desc create personalInfo
        //@Desc authenticated
        createPersonalInfo: async (_, { newPersonalInfo }, { PersonalInfo }) => {
            try {
                const { firstName, lastName } = newPersonalInfo;
                const personExisted = await PersonalInfo.findOne({ $and: [{ firstName: firstName, lastName: lastName }] });
                if (personExisted) {
                    return {
                        success: false,
                        message: "បុគ្គលនេះមានក្នងប្រព័ន្ធហើយ"
                    }
                }
                const personalInfo = new PersonalInfo(newPersonalInfo);
                const created = personalInfo.save();
                if (!created) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ចូលបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បញ្ចូលបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចបញ្ចូលបានទេ" + error.message
                }
            }
        },
        // //@Desc update personalInfo
        // //@Desc authenticated
        updatePersonalInfo: async (_, { newPersonalInfo, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "គ្មានបុគ្គលនេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const updated = await PersonalInfo.findByIdAndUpdate(personalInfoId, newPersonalInfo);
                if (!updated) {
                    return {
                        success: false,
                        message: "មិនអាចកែបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "កែប្រែបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចកែបានទេ"
                }
            }
        },
        // //@Desc delete a personalInfo
        // //@Desc admin 
        deletePersonalInfo: async (_, { personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "គ្មានបុគ្គលនេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleted = await PersonalInfo.findByIdAndDelete(personalInfoId);
                if (!deleted) {
                    return {
                        success: false,
                        message: "មិនអាចលុបបានទេ"
                    }
                }

                return {
                    success: true,
                    message: "លុបបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចលុបបានទេ" + error.message
                }
            }
        },
        // //@Desc vaccination a personalInfo
        // //@Desc admin 
        addVaccination: async (_, { newVaccination, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គល់នេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }

                const added = await PersonalInfo.findByIdAndUpdate(
                    personalInfoId,
                    { $push: { vaccination: newVaccination } }
                );

                if (!added) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ចូលការចាក់វ៉ាក់សាំងបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បញ្ចូលវ៉ាក់សាំងបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចបញ្ចូលការចាក់វ៉ាក់សាំងបានទេ"
                }
            }
        },

        // //@Desc update the vaccination in the personalinfo
        // //@Desc admin 

        updateVaccination: async (_, { newVaccination, personalInfoId, vaccinationId }, { PersonalInfo }) => {

            try {
                const existed = await PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គល់នេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const vaccinExisted = await PersonalInfo.find().elemMatch("vaccination", { "_id": vaccinationId });
                if (!vaccinExisted) {
                    return {
                        success: false,
                        message: "មិនមានការចាក់វ៉ាក់សាំងនេះទេ"
                    }
                }

                const updated = await PersonalInfo.findOneAndUpdate(
                    { _id: personalInfoId, "vaccination._id": vaccinationId },
                    {
                        $set: {
                            "vaccination.$.times": newVaccination.times,
                            "sampleTest.$.date": newVaccination.date,
                            "vaccination.$.vaccineType": newVaccination.vaccineType,
                            "sampleTest.$.vacinatedAt": newVaccination.vacinatedAt,
                        }
                    }
                );

                if (!updated) {
                    return {
                        success: false,
                        message: "មិនអាចកែប្រែការចាក់វ៉ាក់សាំងបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "កែប្រែបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចកែប្រែការចាក់វ៉ាក់សាំងបានទេ" + error.message
                }
            }

        },

        //  //@Desc delete the vaccination in the personalinfo
        // //@Desc admin 
        deleteVaccination: async (_, { vaccinationId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គល់នេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleteVaccination = await PersonalInfo.updateOne(
                    { _id: personalInfoId },
                    {
                        $pull: { vaccination: { _id: vaccinationId } },
                    }
                );
                if (!deleteVaccination) {
                    return {
                        success: false,
                        message: "ការចាក់វ៉ាក់សាំងមិនត្រូវលុបបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "ការលុបការចាក់វ៉ាក់សាំងបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានបុគ្គល់នេះក្នុងប្រព័ន្ធយើងទេ"
                }
            }
        },
        //@Desc add examanation in the personalinfo
        //@Desc admin 

        addExamanation: async (_, { newExamantion, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.find(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធនេះទេ"
                    }
                }
                const added = PersonalInfo.findByIdAndUpdate(
                    personalInfoId,
                    { $push: { examanation: newExamantion } }
                )
                if (!added) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ជូលការប្រឡងបានទេ!"
                    }
                }
                return {
                    success: true,
                    message: "ការប្រឡងបញ្ជូលបានជោគជ័យ!"
                }
            } catch (error) {
                return {
                    message: "cannnot add examination",
                    success: false
                }
            }
        },
        //@Desc update examanation in the personalinfo
        //@Desc admin 

        updateExamanation: async (_, { newExamanation, examanationId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = PersonalInfo.findById(personalInfoId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const examanationExisted = await PersonalInfo.find().elemMatch("examanation", { "_id": examanationId });
                if (!examanationExisted) {
                    return {
                        success: false,
                        message: "មិនមានការប្រឡងនេះទេ!"
                    }
                }
                const updated = PersonalInfo.findByIdAndUpdate(
                    { _id: personalInfoId, "examanaton._id": examanationId },
                    {
                        $set: {
                            "examDate.$.date": newExamanation.date,
                            "subjectId.$.Subject": newExamanation.subjectId,
                            "examtype.$.String": newExamanation.examType,
                            "score.$.score": newExamanation.score,
                            "scoredBy.$.coredBy": newExamanation.scoredBy
                        }
                    }
                );
                if (!updated) {
                    return {
                        success: false,
                        message: "មិនអាចកែប្រែការប្រឡងបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "ការប្រឡងកែប្រែបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធយើងទេ!"
                }
            }
        },

        // //@Desc Delete examanation in the personalinfo
        // //@Desc admin 

        deleteExamantion: async (_, { examanationId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនេះនៅក្នុងប្រព័ន្ធយើងទេ"
                    }
                }
                const deleteExamantion = await PersonalInfo.updateOne(
                    { _id: personalInfoId },
                    {
                        $pull: { examanation: { _id: examanationId } }
                    }
                );
                if (!deleteExamantion) {
                    return {
                        success: false,
                        message: "មិនអាចលុបការប្រឡងបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុបការប្រឡងបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានបុគ្គលនេះនៅក្នុងប្រព័ន្ធយើងទេ" + error.message
                }
            }
        },
        // //@Desc Create Subject in the personalinfo
        // //@Desc admin 
        addSubject: async (_, { newSubject, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានមុខវិជ្ជានៅក្នុងប្រព័ន្ធនេះទេ!"
                    }
                }
                const created = await PersonalInfo.findByIdAndUpdate(
                    personalInfoId,
                    { $push: { subject: newSubject } }
                )
                if (!created) {
                    return {
                        success: false,
                        message: "មុខវិជ្ជាមិនអាចបង្កើតបានទេ!"
                    }
                }
                return {
                    success: false,
                    message: "មុខវិជ្ជាបង្កើតបានជោគជ័យ!"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានមុខវិជ្ជានៅក្នុងប្រព័ន្ធនេះទេ!" + error.message
                }
            }
        },
        // //@Desc update subject in the personalinfo
        // //@Desc admin 
        updateSubjectTostudent: async (_, { newSubject, subjectId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធនេះទេ!"
                    }
                }
                const updated = PersonalInfo.findByIdAndUpdate(
                    { _id: personalInfoId, "subject._id": subjectId },
                    {
                        $set: {
                            "subjectName.$.subjectName": newSubject.subjectName,
                        }
                    }
                );
                if (!updated) {
                    return {
                        success: false,
                        message: "មិនអាចកែប្រែមុខវិជ្ជាបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "កែប្រែមុខវិជ្ជាបានជោគជ័យ"
                }

            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធនេះទេ" + error.message
                }
            }
        },
        // //@Desc delete subject in the personalinfo
        // //@Desc admin 
        deleteSubjectTostudent: async (_, { subjectId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(subjectId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធនេះទេ!"
                    }
                }
                const deleted = await PersonalInfo.updateOne(
                    { _id: personalInfoId },
                    {
                        $pull: { subject: { _id: subjectId } }
                    }
                );
                if (!deleted) {
                    return {
                        success: false,
                        message: "មិនអាចលុបមុខវិជ្ជាបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុបការមុខវិជ្ជាបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានបុគ្គលនៅក្នុងប្រព័ន្ធនេះទេ!" + error.message
                }
            }
        },
        // //@Desc Create Enrollment in the personalinfo
        // //@Desc admin 

        createEnrollments: async (_, { newEnrollment, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId);
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានបុគ្គលនេះក្នុងប្រព័ន្ធយើងទេ"
                    }
                }

                const added = await PersonalInfo.findByIdAndUpdate(
                    personalInfoId,
                    { $push: { enrollment: newEnrollment } }
                );

                if (!added) {
                    return {
                        success: false,
                        message: "មិនអាចបញ្ចូលការបង់ប្រាក់បានទេ"
                    }
                }
                return {
                    success: true,
                    message: "បញ្ចូលការបង់ប្រាក់បានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនអាចបញ្ចូលការបង់ប្រាក់បានទេ"
                }
            }
        },
        updateEnrollment: async (_, { newEnrollment, enrollmentId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = await PersonalInfo.findById(personalInfoId)
                if (!existed) {
                    return {
                        success: false,
                        message: "This Personal Infor does not existed"
                    }
                }
                const updated = PersonalInfo.findByIdAndUpdate(
                    { _id: personalInfoId, "enrollment._id": enrollmentId },
                    {
                        $set: {
                            // "subjectName.$.subjectName": newSubject.subjectName,
                            "programId.$.programId": newEnrollment.programId,
                            "academicYearId.$.academicYearId": newEnrollment.academicYearId,
                            "shiftId.$.shiftId": newEnrollment.shiftId,
                            "classroomId.$.classroomId": newEnrollment.classroomId,
                            "discountId.$.discountId": newEnrollment.discountId,
                            "gradeId.$.gradeId": newEnrollment.gradeId,
                            "academicTermId.$.academicTerm": newEnrollment.academicTermId,
                            "crossAmount.$.crossAmount": newEnrollment.crossAmount,
                            " subTotal.$.subTotal": newEnrollment.subTotal,
                            "classFee.$.classFee": newEnrollment.classFee,
                            "amount.$.amount": newEnrollment.amount,
                            "totalAmount.$totalAmount": newEnrollment.totalAmount,
                        }
                    }
                );
                if (!updated) {
                    return {
                        success: false,
                        message: "Cannot Create this Enrollment "
                    }
                }
                return {
                    success: true,
                    message: "Create this Enrollment successfully "
                }
            } catch (error) {
                return {
                    success: false,
                    message: "This Personal Infor does not existed" + error.message
                }
            }
        },
        deleteEnrollment: async (_, { enrollmentId, personalInfoId }, { PersonalInfo }) => {
            try {
                const existed = PersonalInfo.findById(personalInfoId)
                if (!existed) {
                    return {
                        success: false,
                        message: "This Personal Infor does not existed"
                    }
                }
                const deleted = await PersonalInfo.updateOne(
                    { _id: personalInfoId },
                    {
                        $pull: { emnrollment: { _id: enrollmentId } }
                    }
                );
                if (!deleted) {
                    return {
                        success: false,
                        message: "Cannot delete this record"
                    }
                }
                return {
                    success: true,
                    message: "Deleted successfull"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "This Personal Infor does not existed" + error.message
                }
            }

        }


    }
}
