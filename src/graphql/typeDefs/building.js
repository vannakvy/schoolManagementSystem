
import { gql } from "apollo-server-express";


export default gql`
   extend type Query{
    totalBuilding:Int!
    allBuildings:[Building!]!
    getBuildingsWithPagination(page:Int,limit:Int,keyword:String):BuildingPaginator!
    }

    extend type Mutation{
    createBuilding(newBuilding:BuildingInput!):BuildingResponse!
    updateBuilding(newBuilding:BuildingInput!, buildingId:ID!):BuildingResponse!
    deleteBuilding(buildingId:ID!):BuildingResponse!
    }


    type Building{
        _id:ID!
        buildingName:String,
        schoolId:School!
        numberOfRoom:Int,
        remark:String,
        createdBy:User!
        numberOfFloor:Int,

    }
    input BuildingInput{
        buildingName:String,
        schoolId:Int
        numberOfRoom:Int,
        numberOfFloor:Int,
        remark:String,
        createdBy:ID
    }
    type BuildingResponse{
        success:Boolean!
        message:String!
    }

    type BuildingPaginator{
        buildings:[Building!]!
        paginator:Paginator!
    }

`