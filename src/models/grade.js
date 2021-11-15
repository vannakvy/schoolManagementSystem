import mongoose from 'mongoose' 
import paginate from 'mongoose-paginate-v2'

const gradeSchema = mongoose.Schema({
    gradeName:String,
    remark:String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});
gradeSchema.plugin(paginate)
const Grade = mongoose.model("Grade",gradeSchema);

export default Grade;