import mongoose from 'mongoose'


const AcademicYearSchema = mongoose.Schema({
    academicYear: String,
    status: Boolean,
    note: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    }
}, { timestamps: true });

const AcademicYear = mongoose.model("AcademicYear", AcademicYearSchema);

export default AcademicYear;
