import React, {useContext} from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = ({post: {body, createdAt, id, username, comments, likes}}) => {
    const {user} = useContext(AuthContext)

    let props = {
      user, 
      id,
      likes
    }
    const commentPost = () => {

    }
    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as ={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
           <LikeButton {...props}/>
            <Button color='teal' basic onClick={commentPost} as = {Link} to ={`/post/${id}`}>
                <Icon name='comments' />
                <Label basic color='blue' pointing='left'>
                {comments.length}
            </Label>
            </Button>
            {user&& user.username === username && <DeleteButton postId= {id} />}
        </Card.Content>
      </Card>
    )
}

export default PostCard