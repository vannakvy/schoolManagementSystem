import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const bookShelfSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    bookShelfName: String,
    floor: String,
    note: String
})
bookShelfSchema.plugin(paginate)
const BookShelf = mongoose.model("BookShelf", bookShelfSchema)
export default BookShelf
