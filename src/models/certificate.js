import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const certificateSchema = mongoose.Schema({
    gradeName: String,
    remark: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    }

});
certificateSchema.plugin(paginate)
const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;