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
    squirrelName: String
    primaryFurColor: String!
    age: String!
    actions: [Action!]!
    location: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    searchhistory: [String!]
    favSquirrels: [String!]
  }

  type Squirrel {
    squirrelUUID: String!
    squirrelName: String!
    primaryFurColor: String!
    age: String!
    actions: [Action!]
    location: String!
}
  
  type Query {
    getSquirrels: [Squirrel!]!
  }

`;

export default typeDefs;
