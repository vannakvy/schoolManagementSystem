import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        allSectionType:[SectionType!]!
    }

    extend type Mutation{
        createSectonType(newSectionType:SectionTypeInput!): SectionTypeResponse!
        updateSectionType(newSectionType:SectionTypeInput!,sectionTypeId:ID!): SectionTypeResponse!
        deleteSectionType(sectionTypeId:ID!): SectionTypeResponse!
    }

    type SectionType{
        _id: ID!
        sectionTypeName: String,
        note: String,
    }
    input SectionTypeInput{
       sectionTypeName: String,
        note: String,
    }
    type SectionTypeResponse{
        success:Boolean!
        message:String!
    }


`