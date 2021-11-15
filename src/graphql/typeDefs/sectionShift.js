import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
    allSectionShift:[SectionShift!]!
    getSectionShiftWithPagination(page:Int!,limit:Int,keyword:String):SectionShiftPaginator!
    }

    extend type Mutation{
    createSectionShift(newSectionShift:SectionShiftInput!):SectionShiftResponse!
    updateSectionShift(newSectionShift:SectionShiftInput,sectionShiftId:ID!):SectionShiftResponse!
    deleteSectionShift(sectionShiftId:ID!):SectionShiftResponse!
    }

    type SectionShift{
         _id:ID!
        sectionShiftName:String
        schoolId:School
        academicYearId:AcademicYear
        shiftId:Shift
        programId:Program
        gradeId:Grade
        classId:Classes
        sectionTypeId:SectionType
        classroomId:Classroom
        personalInfoId:PersonalInfo
    }

    input SectionShiftInput{
        schoolId:ID!
        sectionShiftName:String
        academicYearId:ID
        shiftId:ID
        programId:ID
        gradeId:ID
        classId:ID
        sectionTypeId:ID
        classroomId:ID
        personalInfoId:ID
    }
    type SectionShiftResponse{
        success:Boolean!
        message:String!
    }
    type SectionShiftPaginator{
        sectionShift:[SectionShift!]!
        paginator:Paginator!
    }

`