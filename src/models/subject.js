import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const subjectSchema = mongoose.Schema({
    subjectName: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    remark: String

});
subjectSchema.plugin(paginate)
const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;