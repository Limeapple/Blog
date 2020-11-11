import {gql} from '@apollo/client'

export const fetchPost = gql`
{ getPosts{
     id
     body
     createdAt
     username
     
     likes{
         username
     }
     
     comments{
         id
         username
         createdAt
         body
     }
 } } 
`