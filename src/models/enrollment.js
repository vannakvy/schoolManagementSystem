import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const enrollmentSchema = mongoose.Schema({
    month: String,
    personalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    },
    acedemicYearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear"
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    classroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom"
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discount"
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    },
    academicTermId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerm"
    },
});
enrollmentSchema.plugin(paginate)
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;