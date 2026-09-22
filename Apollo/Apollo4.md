# Apollo 4

从 Apollo Server 4 开始， ApolloServer 跟具体的 HTTP 框架解耦了,
它不再自带监听 HTTP 端口的能力

`new ApolloServer({ typeDefs, resolvers })` 现在只是搭好 GraphQL 的执行引擎(schema + resolver 管道)，不涉及任何 HTTP 层的东西，因此没有 .listen() 方法了(v3 有)。

用 `@apollo/server/standalone`零配置内部自己起一个 node:http server，处理好 CORS、body 解析，适合"就要一个纯 GraphQL 服务，不需要额外自定义路由"的场景

## expressMiddleware

expressMiddleware 在 v4+ 被拆到 @as-integrations/express5, @apollo/server 本体不再带）。
