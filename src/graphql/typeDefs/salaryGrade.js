import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
        allSalaryGrades:[SalaryGrade!]!
        getSalaryGradeWithpaginations(page:Int,limit:Int,keyword:String): SalaryGradePaginator
    }
    extend type Mutation{
        createSalaryGrade(newSalaryGrade: SalaryGradeInput):SalaryGradeResponse!
        updateSalaryGrade(newSalaryGrade:SalaryGradeInput!, salaryGradeId:ID!):SalaryGradeResponse!
        deleteSalaryGrade(salaryGradeId:ID!):SalaryGradeResponse!
    }
    type SalaryGrade{
        _id:ID!
        schoolId:School
        gradeName:String
        basicSalary:Float
        houseRent:Float
        transportAllowance:Float
        medicalAllowance:Float
        overTimerRate:Float
        providentFund:Float
        shiftId:Shift
        note:String
    }
    input SalaryGradeInput{
        schoolId:ID
        gradeName:String
        basicSalary:Float
        houseRent:Float
        transportAllowance:Float
        medicalAllowance:Float
        overTimerRate:Float
        providentFund:Float
        shiftId:ID
        note:String
    }
    type SalaryGradeResponse{
        success:Boolean!
        message:String!
    }
    type SalaryGradePaginator{
        SalaryGrades:[SalaryGrade!]!
        paginator:Paginator
    }

`