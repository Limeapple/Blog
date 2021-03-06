import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../component/Postcard'
import PostForm from '../component/PostForm'
import {AuthContext} from '../context/Auth'
import { fetchPost } from '../util/Graphql'

const Home = () => {
    const { user } = useContext(AuthContext)
    const {loading, data } = useQuery(fetchPost)
   
    return (
        <Grid columns={3} >
            <Grid.Row className = 'page-title'>
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                { user &&(
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )
                }
                { loading ? (<h1>Loading Post</h1>): data.getPosts && data.getPosts.map( post => (
                    <Grid.Column key={post.id} style={{marginBottom:20}}> 
                        <PostCard post = {post} />
                    </Grid.Column>
                ))}
            </Grid.Row>
        </Grid>
    )
}



export default Home