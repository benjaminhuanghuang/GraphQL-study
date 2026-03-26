# Pass db in the context

- 解耦：resolver 不依赖全局变量
- 可测试性强：可以 mock context
- 支持多租户 / 多数据库
- 每个请求独立上下文（可以放 user、权限等）
- Apollo 官方推荐方式
