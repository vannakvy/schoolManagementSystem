import mongoose, { mongo } from 'mongoose'
import Paginate from 'mongoose-paginate-v2'


const PersonalInfoShema = mongoose.Schema({
    role: {
        type: String,
        enum: ["គ្រូ", "សិស្ស", "បុគ្គលិក", "អាណាព្យាបាល", "ភ្ញៀវ", "ឪពុកម្ដាយ", "ផ្សេងៗ"]
    },
    enrollment: [
        {
            programId: {
                type: mongoose.Types.ObjectId,
                ref: "Program"
            },
            academicYearId: {
                type: mongoose.Types.ObjectId,
                ref: "AcademicYear"
            },
            crossAmount: Number,
            subTotal: Number,
            shiftId: {
                type: mongoose.Types.ObjectId,
                ref: "Shift"
            },
            classroomId: {
                type: mongoose.Types.ObjectId,
                ref: "Classroom"
            },
            discountId: {
                type: mongoose.Types.ObjectId,
                ref: "Discount"
            },
            gradeId: {
                type: mongoose.Types.ObjectId,
                ref: "Grade"
            },
            academicTermId: {
                type: mongoose.Types.ObjectId,
                ref: "AcademicTerm"
            },
            schoolId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "School"
            },
            classFee: Number,
            amount: Number,
            totalAmount: Number
        }
    ],
    StudentSubjects: [
        {
            grade: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Grade"
            },
            programId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program"
            },
            classesId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Classes"
            },
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject"
            },
        }
    ],
    exams: [
        {
            examDate: Date,
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject"
            },
            examType: {
                type: String,
                default: "ប្រឡងប្រចាំខែ",
                enum: ["ប្រឡងឆមាសទីពីរ", "ប្រឡងឆមាសទីមួយ", "ប្រឡងប្រចាំខែ", "ផ្សេងៗ"]
            },
            score: Number,
            scoredBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    bloodGroup: {
        type: String,
        enum: ["A-", "B+", "B-", "O-", "O+", "AB+", "AB-"]
    },
    jioningDate: Date,
    religion: String,
    passportNumber: String,
    passportExpired: Date,
    isResigned: Boolean,
    social: String,
    permanentAddress: String,
    currentAddress: String,
    firstName: String,
    lastName: String,
    englishName: String,
    gender: String,
    tel: String,
    nationality: String,
    occupation: String,
    idCard: String,
    profileImg: String,
    village: String,
    commune: String,
    district: String,
    province: String,
    dob: Date,
    remark: String,
    guardian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vaccination: [{
        times: Number,
        date: Date,
        vaccineType: String,
        vacinatedAt: String,
    }],
    //ជំងឺប្រចាំកាយ
    chronic: String,

}, {
    timestamps: true
})
PersonalInfoShema.plugin(Paginate)
const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoShema);
export default PersonalInfo;

