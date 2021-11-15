import  mongoose  from "mongoose";
import paginate from 'mongoose-paginate-v2'
const programSchema = new mongoose.Schema({
    programmName:String,
    remark:String,
    createdAt: Date,
    school:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"School"
    }
})

programSchema.plugin(paginate);

const Program = mongoose.model("Program", programSchema);
export default Program;