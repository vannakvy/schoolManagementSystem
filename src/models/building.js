import mongoose from 'mongoose' 
import paginate from 'mongoose-paginate-v2'

const buildingSchema =mongoose.Schema({
    buildingName:String,
    schoolId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'School'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    numberOfRoom:Number,
    remark:String,
    numberOfFloor:Number
})

buildingSchema.plugin(paginate)

const Building = mongoose.model("Building",buildingSchema);


export default Building;