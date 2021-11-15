import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const classGroupSchema = mongoose.Schema({

    classGroupName: String,
    note: String,
    code: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    },

}, {
    timestamps: true
})

classGroupSchema.plugin(paginate)

const ClassGroup = mongoose.model("ClassGroup", classGroupSchema);

export default ClassGroup;