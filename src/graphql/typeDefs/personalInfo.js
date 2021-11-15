import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allPersonalInfos: [PersonalInfo!]!
        getPersonalInfoWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getTeacherWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getStudentWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getStaffWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getGardianWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getGuessWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getOthersWithPagination(page:Int, limit:Int, keyword: String): PersonalInfoPaginator!
        getEnrollmentWithPagination(page:Int, limit:Int, keyword:String):PersonalInfoPaginator!
    }
    extend type Mutation{
        createPersonalInfo(newPersonalInfo:PersonalInfoInput):PersonalInfoResponse!
        updatePersonalInfo(newPersonalInfo:PersonalInfoInput,personalInfoId:ID!):PersonalInfoResponse!
        deletePersonalInfo(personalInfoId:ID!):PersonalInfoResponse!
        
        addVaccination(newVaccination:VaccinationInput!,personalInfoId:ID!):PersonalInfoResponse!
        updateVaccination(newVaccination:VaccinationInput!,personalInfoId:ID!vaccinationId:ID!):PersonalInfoResponse!
        deleteVaccination(vaccinationId:ID!, personalInfoId:ID!):PersonalInfoResponse!

        addExamanation(newExam:ExamInput!, personalInfoId:ID!):PersonalInfoResponse!
        updateExamanation(newExamanation:ExamInput!, examId:ID!, personalInfoId:ID):PersonalInfoResponse!
        deleteExamantion(examId:ID!, personalInfoId:ID!):PersonalInfoResponse!

        addSubject(newSubject:StudentSubjectsInput!, personalInfoId:ID!):PersonalInfoResponse!
        updateSubjectTostudent(newsubject:StudentSubjectsInput!, subjectId:ID, personalInfoId:ID!):PersonalInfoResponse!
        deleteSubjectTostudent(subjectId:ID!, personalInfoId:ID!):PersonalInfoResponse!

        createEnrollments(newEnrollment:enrollmentInput!, personalInfoId:ID):PersonalInfoResponse!
        updateEnrollment(newEnrollment: enrollmentInput, enrollmentId:ID!, personalInfoId:ID!):PersonalInfoResponse!
        deleteEnrollment(enrollmentId:ID!, personalInfoId:ID!):PersonalInfoResponse!
    }
    type PersonalInfoPaginator{
        paginator:Paginator!
        personalInfos:[PersonalInfo!]!
    }
    type PersonalInfoResponse{
        success:Boolean!
        message:String!
    }

    type PersonalInfo{
        _id:ID
        role:String,
        social:String,
        permanentAddress:String,
        currentAddress:String,
        firstName:String,
        lastName:String,
        englishName:String,
        gender:String,
        tel:String,
        nationality:String,
        occupation:String,
        idCard:String,
        profileImg:String,
        village:String,
        commune:String,
        district:String,
        province:String,
        dob:Date,
        remark:String,
        createdBy:User
        chronic:String
        vaccination:[Vaccination!]!
        createdAt:Date
        exams:[Exam!]!
        studentSubjects:[StudentSubjects!]!
        gardain:PersonalInfo
        parent:PersonalInfo
        isResigned:Boolean,
        bloodGroup:String
        religion:String
        passportNumber:String
        passportExpired:Date
        jioningDate:Date,
    }

    input PersonalInfoInput{
        role:String,
        chronic:String,
        social:String,
        permanentAddress:String,
        currentAddress:String,
        firstName:String,
        lastName:String,
        englishName:String,
        gender:String,
        tel:String,
        nationality:String,
        occupation:String,
        idCard:String,
        profileImg:String,
        village:String,
        commune:String,
        district:String,
        province:String,
        dob:Date,
        remark:String,
       
        createdBy:ID
        exams:[ExamInput]
        studentSubjects:[StudentSubjectsInput]
        gardain:ID
        parent:ID
        isResigned:Boolean,
        bloodGroup:String
        religion:String
        passportNumber:String
        passportExpired:Date
        jioningDate:Date,
    }

    type Vaccination{
        times:Int,
        date:Date,
        vaccineType:String,
        vacinatedAt:String,
    }

    input VaccinationInput{
        times:Int,
        date:Date,
        vaccineType:String,
        vacinatedAt:String,
    }

    type Exam{
            examDate: Date,
            subjectId:Subject
            examType:String
            score:Float!,
            scoredBy:User!
    }
    input ExamInput{
            examDate: Date,
            subjectId:ID!
            examType:String!
            score:Float!,
            scoredBy:ID!
    }

    type PersonalInfoPaginator{
        paginator:Paginator,
        personalInfos:[PersonalInfo!]!
        
    }

    type Enrollment{
        _id:ID
        personalInfoId:[PersonalInfo]!
        programId:Program
        academicYearId:AcademicYear
        shiftId:Shift
        classroomId:Classroom
        discountId:Discount
        schoolId:School
        gradeId:Grade
        academicTermId:AcademicTerm
        crossAmount:Float,
        subTotal:Float,
        classFee:Float,
        amount:Float,
        totalAmount:Float
    }
    input enrollmentInput{
        programId:ID
         personalInfoId:ID
        academicYearId:ID
        shiftId:ID
        classroomId:ID
        discountId:ID
         schoolId:ID
        gradeId:ID
        academicTermId:ID
        crossAmount:Float,
        subTotal:Float,
        classFee:Float,
        amount:Float,
        totalAmount:Float
    }

    type StudentSubjects{
            grade:Grade!
            programID:Program!
            classId:Classes!
            subjectId:Subject!
    }
    input StudentSubjectsInput{
            grade:ID!
            programID:ID!
            classesId:ID!
            subjectId:ID!
    }

`