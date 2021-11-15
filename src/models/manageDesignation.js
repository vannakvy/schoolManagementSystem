import mongoose from 'mongoose'

const manageDesignationSchema = mongoose.Schema({

    designation: String,
    note: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
})


const Designation = mongoose.model("Designation", manageDesignationSchema);

export default Designation;