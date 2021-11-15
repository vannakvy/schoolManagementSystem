export default {
    Query: {
        allSectionType: async (_, { }, { SectionType }) => {
            const sectionTypes = await SectionType.find({});
            return sectionTypes;
        }
    },
    Mutation: {
        createSectonType: async (_, { newSectionType }, { SectionType }) => {
            try {
                const existed = await SectionType.findOne({ sectionTypeName: newSectionType.sectionTypeName });
                if (existed) {
                    return {
                        success: false,
                        message: "Section Type បានបង្កើតរួចហើយ"
                    }
                }

                const sectionType = new SectionType(newSectionType);
                const created = sectionType.save();
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
                    message: "Section Type បានបង្កើតរួចហើយ"
                }
            }
        },
        updateSectionType: async (_, { newSectionType, sectionTypeId }, { SectionType }) => {

            try {

                const existed = await SectionType.findById(sectionTypeId)

                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមានឆ្នាំសិក្សានៅក្នុងប្រព័ន្ធនេះទេ"
                    }
                }
                const updated = await SectionType.findByIdAndUpdate(sectionTypeId, newSectionType);
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

        deleteSectionType: async (_, { sectionTypeId }, { SectionType }) => {
            try {
                const existed = await SectionType.findById(sectionTypeId)
                if (!existed) {
                    return {
                        success: false,
                        message: "មិនមាន Section Type នៅក្នុងប្រព័ន្ធយើងទេ!"
                    }
                }
                const deleted = await SectionType.findByIdAndDelete(sectionTypeId)
                if (!deleted) {
                    return {
                        success: false,
                        message: "មិនអាចលុបSection Typeបានទេ"
                    }
                }
                return {
                    success: true,
                    message: "លុបSection Typeបានជោគជ័យ"
                }
            } catch (error) {
                return {
                    success: false,
                    message: "មិនមានSection Typeនៅក្នុងប្រព័ន្ធយើងទេ!" + error.mmessage
                }
            }
        }
    }


}