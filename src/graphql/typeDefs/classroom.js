import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
   totalClassroom:Int!
    allClassrooms:[Classroom!]!
    getClassroomsWithPagination(page:Int,limit:Int,keyword:String):ClassroomPaginator!
    }

    extend type Mutation{
    createClassroom(newClassroom:ClassroomInput!):ClassroomResponse!
    updateClassroom(newClassroom:ClassroomInput!,classroomId:ID! ):ClassroomResponse!
    deleteClassroom(classroomId:ID!):ClassroomResponse!
    }


    type Classroom{
        _id:ID!
        classroomName:String
        dimension:String
        capacity:Int
        condition:String
        isAirConditioned:Boolean
        isFanned:Boolean
        isPrjectored:Boolean
        floorNumber:Int
        schoolId:School
        createdBy:User
        buildingId:Building
    }
    input ClassroomInput{
        classroomName:String
        dimension:String
        capacity:Int
        condition:String
        isAirConditioned:Boolean
        isFanned:Boolean
        isPrjectored:Boolean
        floorNumber:Int
        schoolId:ID
        createdBy:ID
        buildingId:ID
    }
    type ClassroomResponse{
        success:Boolean
        message:String
    }
    type ClassroomPaginator{
        classrooms:[Classroom!]!
        paginator:Paginator!
    }

`