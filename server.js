const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const {MONGO_URI} = require('./config')

const PORT = process.env.PORT || 5000

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    err => err ? console.log('Failed to connect to mongoDB') : console.log('MongoDB connected'))

server.listen(PORT, () => console.log('Server is running'))