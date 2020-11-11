import React, {useContext} from 'react'
import { gql, useQuery } from '@apollo/client'
import { Button, Card, Grid, Label, Image, Icon } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from './LikeButton'
import {AuthContext} from '../context/Auth'
import DeleteButton from './DeleteButton'

const SinglePost = (props) => {
    const {user} = useContext(AuthContext)
    const postId = props.match.params.postId
    let postMarkup

    const { loading, error, data} = useQuery(FETCH_POST_QUERY, {
        variables:{postId}
    });
    
    if(loading){
        return null;
    }
    //:{id, body, createdAt, username, comments, likes}
    let id = data.getPost.id
    let likes = data.getPost.likes
    
    const deletePostCallback = () => {
        props.history.push('/')
    }
    let prop = {
        user,
        id,
        likes
    }
    postMarkup =(
        <Grid>
            <Grid.Row>
                <Grid.Column width = {2}>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                 />
                </Grid.Column>
                <Grid.Column width = {10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{data.getPost.username}</Card.Header>
                            <Card.Meta>{moment(data.getPost.createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{data.getPost.body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            
                            <LikeButton  {...prop}>
                                <Button as = 'div' label = 'right'>
                                    <Button basic color='blue'>
                                        <Icon name = 'comments' />
                                    </Button>
                                    <Label basic color = 'blue' pointing= 'left'>
                                        {data.getPost.comments.length}
                                    </Label>
                                </Button>
                                {user && user.username === data.getPost.username && <DeleteButton postId = {data.getPost.id} callback = {deletePostCallback}/>}
                            </LikeButton>
                        </Card.Content>
                    </Card>
                    {data.getPost.comments.map(comment => (
                        <Card fluid key = {comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId = {data.getPost.id} commentId = {comment.id} />
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
    
    return postMarkup
}

const FETCH_POST_QUERY = gql `
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likes{
              username
            }
            comments{
              id
              createdAt
              username
              body
            }
        }
    }
`
export default SinglePost