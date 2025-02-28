const typeDefs = `
  type Comments {
    _id: ID!
    squirrelUUID: String!
    textCOntent: String!
    username: String!
  }

  type FavSquirrels {
    _id: ID!
    squirrelUUID: String!
    squirrelName: String!
    primaryFurColor: String!
    age: String!
    actions: Object!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    searchhistory: [String!]
    favSquirrels: [String!]
  }

`;

export default typeDefs;
