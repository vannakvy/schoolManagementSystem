import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'



const bookCategorySchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    categoryName: String,
    note: String

})

bookCategorySchema.plugin(paginate)
const BooKCategory = mongoose.model("BookCategory", bookCategorySchema)
export default BooKCategory