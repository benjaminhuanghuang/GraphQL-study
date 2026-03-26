# Apollo Context

## Pass db in the context

- 解耦：resolver 不依赖全局变量
- 可测试性强：可以 mock context
- 支持多租户 / 多数据库
- 每个请求独立上下文（可以放 user、权限等）
- Apollo 官方推荐方式

在 Apollo Server：一切“请求相关”的东西（db / user / services）都应该走 context，不要直接 import
