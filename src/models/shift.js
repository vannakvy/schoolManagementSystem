import mongoose from "mongoose"
import paginate from 'mongoose-paginate-v2'
const shiftSchema = mongoose.Schema({
    shiftName: String,
    note: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
shiftSchema.plugin(paginate)
const Shift = mongoose.model("Shift", shiftSchema)
export default Shift