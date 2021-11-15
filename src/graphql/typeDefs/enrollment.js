import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
    allEnrollment:[Enrollment!]!
    getallEnrollment(page:Int!,limit:Int,keyword:String):EnrollmentPaginator!
    }

    extend type Mutation{
    createEnrollment(newEnrollment:EnrollmentInput!):EnrollmentResponse!
    updateEnrollment(newEnrollment:EnrollmentInput,enrollmentId:ID!):EnrollmentResponse!
    deleteEnrollment(enrollmentId:ID!):EnrollmentResponse!
    }

    type Enrollment{
        _id:ID!
        month:String!
        personalId:PersonalInfo!
        programId:Program!
        acedemicYearId:AcademicYear!
        shiftId:Shift!
        classroomId:Classroom!
        discountId:Discount!
        gradeId:Grade!
        academicTermId:AcademicTerm!
    }

    input EnrollmentInput{
        _id:ID!
        month:String!
        personalId:ID!
        programId:ID!
        acedemicYearId:ID!
        shiftId:ID!
        classroomId:ID!
        discountId:ID!
        gradeId:ID!
        academicTermId:ID!
    }
    type EnrollmentResponse{
        success:Boolean!
        message:String!
    }
    type EnrollmentPaginator{
        enrollment:[Enrollment!]!
        paginator:Paginator!
    }

`