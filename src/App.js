import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/Auth'
import AuthRoute from './util/AuthRoute'

import Home from './component/Home'
import Login from './component/Login'
import Register from './component/Register'
import Menubar from './component/MenuBar'
import SinglePost from './component/SinglePost'

import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwt-token')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <AuthProvider>
        <Router>
          <Container>
            <Menubar/>
            <Route exact path = '/' component = {Home} />
            <AuthRoute exact path = '/login' component = {Login} />
            <AuthRoute exact path = '/register' component = {Register} />
            <Route exact path = '/posts/:postId' component ={SinglePost} />
          </Container>
      
        </Router>
      </AuthProvider>
    </ApolloProvider>

  );
}

export default App;
