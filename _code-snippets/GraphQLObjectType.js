const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require('graphql');
const PORT = 4000;

var AccountType = new graphql.GraphQLObjectType({
    name: 'Account',
    fields:{
      name:{type: graphql.GraphQLString},
      age:{type: graphql.GraphQLInt}
    }
  }
);

var queryType = new graphql.GraphQLObjectType(
  {
    name: 'Query',
    fields:{
      account:{
        type: AccountType,
        args:{
          username:{type: graphql.GraphQLString}
        },
        resolve: function(_, {username}){
          const name = username;
          const age =18;
          return {
            name, 
            age
          }
        }
      }
    }
  }
)

var schema = new graphql.GraphQLSchema({query: queryType});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Express sever is running at port ${PORT}`);
});