import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'



const classroomSchema = mongoose.Schema({
    classroomName:String,
    dimension:String,
    capacity:Number,
    condition:String,
    isAirConditioned:{
        type:Boolean,
        default:false
    },
    isFanned:{
        type:Boolean,
        default:false
    },
    isPrjectored:{
        type:Boolean,
        default:false
    } ,
    floorNumber:Number,
    schoolId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"School"
    },
    buildingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Building"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
})


classroomSchema.plugin(paginate)

const Classroom = mongoose.model("Classroom",classroomSchema);
export default Classroom;