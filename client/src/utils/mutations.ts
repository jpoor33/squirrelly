import { gql } from '@apollo/client'

//mutation to add a comment

export const ADD_COMMENT = gql`
mutation AddComment($username: String!, $squirrelUuid: String!, $textContent: String!) {
  addComment(username: $username, squirrelUUID: $squirrelUuid, textContent: $textContent) {
    _id
    squirrelUUID
    textContent
    username
  }
}`

export const FAV_SQUIRREL = gql`
mutation AddSquirrel($_id: ID!, $squirrelUUID: String!) {
  addFavSquirrels(_id: $ID, squirrelUUID: $squirrelUUID) {
    _id
    squirrelUUID
  }
}`

