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

export const GET_SINGLE_SQUIRREL = gql`
query GetSingleSquirrel($squirrelUUID: ID!) {
  getSingleSquirrel (squirrelUUID: $squirrelUUID) {
    squirrelUUID
    squirrelName
    primaryFurColor
    age
    actions
    location
  }
}`

export const FIND_COMMENTS = gql`
query Query($id: ID!) {
  findComments(_id: $id) {
    _id
    squirrelUUID
    textContent
    username
  }
}`