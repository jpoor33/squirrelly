import { gql } from '@apollo/client'

//queries to get / eventually display squirrel information
export const GET_SQUIRRELS = gql`
query GetSquirrels {
  getSquirrels {
    squirrelUUID
    squirrelName
    primaryFurColor
    age
    actions
    location
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