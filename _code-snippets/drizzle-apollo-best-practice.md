# Drizzle + Apollo Server best practice

```txt
src/
├── db/
│ ├── index.ts # drizzle 实例
│ ├── schema.ts # 表结构
│
├── graphql/
│ ├── schema.ts # typeDefs
│ ├── resolvers/
│ │ ├── post.ts
│ │ └── user.ts
│
├── services/
│ ├── post.service.ts
│ └── user.service.ts
│
├── context/
│ └── context.ts
│
├── utils/
│ └── auth.ts
│
├── server.ts
```

resolver: 只负责 GraphQL, 不碰 db，只调 service
service: 业务逻辑
db: 纯数据访问

## Bad practice

❌ resolver 直接操作 db
❌ 从 args 传 userId
❌ 没有 service 层
