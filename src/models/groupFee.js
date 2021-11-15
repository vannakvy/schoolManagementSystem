import mongoose from 'mongoose'

const groupFeeSchema = mongoose.Schema({

    groupFeeName: String,
    academicYearCost: Number,
    academicTermCost: Number,
    quarterCost: Number,
    monthCost: Number,
    note: String,
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    },

})


const GroupFee = mongoose.model("GroupFee", groupFeeSchema);

export default GroupFee;