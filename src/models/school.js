import mongoose from 'mongoose' 
import paginate from 'mongoose-paginate-v2'

const schoolSchema = mongoose.Schema({
    schoolName:String,
    village:String,
    commune:String,
    district:String,
    province:String,
    numberOfRoom:Number,
    remark:String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});
schoolSchema.plugin(paginate)
const School = mongoose.model("School",schoolSchema);

export default School;