import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const bookSchema = mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    donateBy: String,
    bookTitle: String,
    bookCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookCategory"
    },
    bookShelfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookShelf"
    },
    addingDate: Date,
    bookID: String,
    isbnNo: String,
    edition: String,
    author: String,
    language: String,
    price: Number,
    quantity: Number,
    book_image: String
})

bookSchema.plugin(paginate)
const Book = mongoose.model("Book", bookSchema)
export default Book