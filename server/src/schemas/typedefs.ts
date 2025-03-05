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
    squirrelImage: String
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
    squirrelName: String
    squirrelImage: String
    primaryFurColor: String!
    age: String!
    actions: [String]
    location: String!
}
  
  type Query {
    getAllUsers: [User]
    findUser(_id: ID!): User
    findComments(_id: ID!): [Comments!]!
    getSquirrels: [Squirrel!]!
    getUserFavorites(username: String!):[Squirrel!]!
    getSingleSquirrel(_id: ID!): Squirrel!
  }

  type Mutation {
    createUser(username:String!,email:String!, password: String!): User!
    addFavSquirrels(username: String!, squirrelUUID: String!) : User!
    addComment(username:String!, squirrelUUID: String!, textContent: String!) : Comments!
  }

`;

export default typeDefs;
