const typeDefs = `
  type Comments {
    _id: ID!
    squirrelUUID: String!
    textContent: String!
    username: String!
  }

  type Action {
  key: String!
  value: Boolean!
  }

  type FavSquirrels {
    _id: ID!
    squirrelUUID: String!
    squirrelName: String!
    primaryFurColor: String!
    age: String!
    actions: [Action!]
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
