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

export const ADD_FAV_SQUIRREL = gql`
  mutation AddFavSquirrel($username: String!, $squirrelUUID: String!) {
    addFavSquirrels(username:$username, squirrelUUID: $squirrelUUID) {
      username
      favSquirrels
    }
}`
