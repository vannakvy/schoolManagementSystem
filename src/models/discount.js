import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const discountSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    title: String,
    amount: Number,
    note: String,
});
discountSchema.plugin(paginate)
const Discount = mongoose.model("Discount", discountSchema);

export default Discount;