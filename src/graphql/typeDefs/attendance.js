import { gql } from "apollo-server-express";


export default gql`
    extend type Query{
        allAttendances:[Attendance!]!
        getAttendWithPagination(page:Int,limit:Int,keyword:String):AttendancePaginator!
        getAttendWithPaginationByStudentId(page:Int,limit:Int,keyword:String,studentId:ID!,subjectId:ID!, startDate:Date!, endDate:Date!, academicYear:Date!, shift:String!):AttendancePaginator!
        getStudentAttentanceBySectionWithPaginsation(page:Int, limit:Int, keyword:String):AttendancePaginator!
        getOneAttendace(attendanceId:ID!):Attendance!
    }

    extend type Mutation{
    createAttendance(newAttendance:AttendanceInput):AttendanceResponse!
    updateAttendance(updateAttendance:AttendanceInput,attendanceId:ID!):AttendanceResponse!
    deleteAttendance(attendanceId:ID!):AttendanceResponse!
    }

    type AttendanceResponse{
        success:Boolean!
        message:String!
    }

    type Attendance{
        attendanceDate:Date!
        subjectId:Subject!
        studentId:PersonalInfo!
        gradeId:Grade!
        classId:Classes!
        shiftId:Shift!
        createdBy:User!
        duration:Int,
        reason:String,
        status:String!
    }

    input AttendanceInput{
        attendanceDate:Date!
        subjectId:ID!
        studentId:ID!
        gradeId:ID!
        classId:ID!
        shiftId:ID!
        createdBy:ID!
        duration:Int!,
        reason:String!,
        status:String!
    }

    type AttendancePaginator{
        attendances:[Attendance!]!
        paginator:Paginator!
    }
        

`