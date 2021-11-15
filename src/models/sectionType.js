import mongoose from "mongoose"

const sectionTypeSchema = mongoose.Schema({
    sectionTypeName: String,
    note: String,
})

const SectionType = mongoose.model("SectionType", sectionTypeSchema)
export default SectionType