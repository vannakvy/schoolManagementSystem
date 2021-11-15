import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const sectionshiftSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    academicYearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear"
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes"
    },
    sectionTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SectionType"
    },
    classroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom"
    },
    personalInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    sectionShiftName: String


});
sectionshiftSchema.plugin(paginate)
const sectionShift = mongoose.model("SectionShift", sectionshiftSchema);

export default sectionShift;