import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import { useMutation, gql } from '@apollo/client'
import { fetchPost } from '../util/Graphql'


const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })
    
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: fetchPost
            })
            proxy.writeQuery({ query: fetchPost, data:{
                getPosts: [result.data.createPost, ...data.getPosts]
            }})
            
            values.body = ''
            
        }
    })

    function createPostCallback(){
        createPost()
    }

    return (
        <>
        <Form onSubmit = {onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input 
                    placeholder = ''
                    name= 'body'
                    onChange = {onChange}
                    value = {values.body}
                    error = {error}
                />
            <Button type ='submit' color='teal'>
                Submit
            </Button>
            </Form.Field>
        </Form>
        {
            error && (
                <div className= 'ui error message'>
                    <ul>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )
        }
       </>
    )
    
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            comments{
                id 
                body
                username
                createdAt
            }
        }
    }
`

export default PostForm