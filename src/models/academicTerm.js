import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'



const academicTermSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    academicYearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear"
    },
    generationNumber: Number,
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    },
    quarter: [
        {
            name: String,
            startDate: Date, endDate: Date
        }
    ],
    start: Date,
    end: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String
}, {
    timestamps: true
})


academicTermSchema.plugin(paginate)

const AcademicTerm = mongoose.model("AcademicTerm", academicTermSchema);
export default AcademicTerm;