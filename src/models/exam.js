import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const examSchema = mongoose.Schema({
    examDate: Date,
    remark: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})
examSchema.plugin(paginate)
const Exam = mongoose.model("Exam", examSchema);
export default Exam;