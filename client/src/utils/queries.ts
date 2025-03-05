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
query getSingleSquirrel($_id: ID!) {
  getSingleSquirrel(_id: $_id) {
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
  findComments(_id: $_id) {
    _id
    squirrelUUID
    textContent
    username
  }
}`

export const GET_USER_FAVORITES = gql`
query GetUserFavorites($username: String!) {
  getUserFavorites(username: $username) {
     squirrelUUID
     squirrelName
     primaryFurColor
     age
     actions
     location
    }
  }`
