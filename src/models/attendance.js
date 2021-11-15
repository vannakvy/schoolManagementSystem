import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const attendanceSchema = mongoose.Schema({
    attendancedate: Date,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    duration: Number,
    reason: String,
    status: {
        type: String,
        default: "NONE",
        enum: ["LATE", "PRESENT", "ABSENT", "PERMISSION"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "personalInfoId"
    },
    academicYear: String
})

attendanceSchema.plugin(paginate)
const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;