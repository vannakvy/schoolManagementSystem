import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2'

const salaryGradeSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    gradeName: String,
    basicSalary: Number,
    houseRent: Number,
    transportAllowance: Number,
    medicalAllowance: Number,
    overTimerRate: Number,
    providentFund: Number,
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    note: String,
}, {
    timestamps: true
});

salaryGradeSchema.plugin(paginate);
const SalaryGrade = mongoose.model("SalaryGrade", salaryGradeSchema);
export default SalaryGrade;