const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
//  PostgreSQL client for Node.js.
const pg = require('pg')
// create a new pool to the database
const pgPool = new pg.Pool({ database: 'pgs_test' })
const app = express()

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: 'development.env' })
}

app.set('port', process.env.PORT || 7000)

const ncSchema = require('./schema')

console.log(process.env.NODE_ENV === 'development');
// Set GraphQL as middleware
// We  use the context to connect to the db and get the req data.
// Each query or mutation has a type, that is the type of respond to the request.
// http://localhost:8864/graphql
app.use('/graphql', cors(), (req, res) => {
  graphqlHTTP({
    schema: ncSchema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { pgPool, req }
  })(req, res)
})

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`)
})

module.exports = app