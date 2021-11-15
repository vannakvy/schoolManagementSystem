import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const visitorInfoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    Name: String,
    Phone: String,
    comingFrom: String,
    reason: String,
    note: String,
});
visitorInfoSchema.plugin(paginate)
const VisitorInfo = mongoose.model("VisitorInfo", visitorInfoSchema);

export default VisitorInfo;

