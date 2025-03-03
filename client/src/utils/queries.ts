import { gql } from '@apollo/client'

//queries to get / eventually display squirrel information
export const GET_SQUIRRELS = gql`
query GetSquirrels {
  getSquirrels {
    actions
    age
    location
    primaryFurColor
    squirrelName
    squirrelUUID
    squirrelImage
  }
}`

export const FIND_COMMENTS = gql`
query FindComments($id: ID!) {
    findComments(_id: $id) {
      squirrelUUID
      textContent
      username
    }
  }`