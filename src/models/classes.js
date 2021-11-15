import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const classesSchema = mongoose.Schema({
    className: String,
    note: String,
    classGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassGroup"
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    }
}, {
    timestamps: true
});
classesSchema.plugin(paginate)
const Classes = mongoose.model("Classes", classesSchema);

export default Classes;