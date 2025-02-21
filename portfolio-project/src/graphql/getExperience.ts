export const GET_EXPERIENCE = `
 query {
    experienceCollection {
     items {
         description {
           json
         }
         order
         companyName,
         jobTitle,
         fromTo
         technologies
     }
    }
   }
`;