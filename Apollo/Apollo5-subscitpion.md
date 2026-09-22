# Apollo Server 5

Apollo Server 5 本身不再直接提供 WebSocket subscription server。通常做法是：

Apollo Server 5 + graphql-ws + ws

```sh
npm install @apollo/server graphql graphql-ws ws
npm install -D @types/ws
```
