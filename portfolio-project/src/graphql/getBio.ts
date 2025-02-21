export const GET_BIO = `
query GetBio($id: String!) {
    bio(id: $id) {
      sys{ id }
      jobTitle
      careerSummary {
        json
      }
    }
  }
`;
