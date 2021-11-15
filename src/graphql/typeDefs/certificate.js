import { gql } from "apollo-server-express";

export default gql`

   extend type Query{
    totalCertificate:Int!
        allCertificate:[Certificate!]!
        getCertificateWithPagination(page:Int!,limit:Int,keyword:String):CertificatePaginator!
    }

    extend type Mutation{
    createCertificate(newCertificate:CertificateInput!):CertificateResponse!
    updateCertificate(newCertificate:CertificateInput, certicateId:ID!):CertificateResponse!
    deleteCertificate(certicateId:ID!):CertificateResponse!
    }

    type Certificate{
        _id:ID!
        schoolId:School!
        certificateName:String!
        Image:String!
    }

    input CertificateInput{
        schoolId:ID!
        certificateName:String!
        Image:String!
    }
    type CertificateResponse{
        success:Boolean!
        message:String!
    }
    type CertificatePaginator{
        classes:[Certificate!]!
        paginator:Paginator!
    }

`