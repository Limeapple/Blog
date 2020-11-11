import React, {useState} from 'react'
import {gql, useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import {fetchPost} from '../util/Graphql'

const DeleteButton = ({postId, commentId, callback}) => {

    const [confirmOpen, setConfirmOpen] = useState(false)
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

     
    const [deletePost] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false)
            if(!commentId){
                const data = proxy.readQuery({
                    query: fetchPost,
                })
                data.getPosts = data.getPosts.filter(p => p.id!== postId)
                proxy.writeQuery({query: fetchPost, data})
            }
            if(callback) callback()
        },
        variables: {postId, commentId}
    })

    return (
        <>
            <Button floated= 'right' as='div' color='red' onClick={() => setConfirmOpen(true)}>
                <Icon name='trash'/>
            </Button>
            <Confirm open = {confirmOpen} onCancel={() =>setConfirmOpen(false)} onConfirm= {deletePost} />
        </>
       
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost( $postId: ID!){
        deletePost(postId: $postId)
    }
`
const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            
        }
    }
`

export default DeleteButton