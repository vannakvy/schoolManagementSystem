import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const DesignationSchema = mongoose.Schema({

    designation: String,
    note: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
})

DesignationSchema.plugin(paginate)
const Designation = mongoose.model("Designation", DesignationSchema);

export default Designation;