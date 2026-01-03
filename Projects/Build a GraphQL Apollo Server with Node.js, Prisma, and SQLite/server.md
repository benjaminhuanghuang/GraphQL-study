# Server

```sh
npm init -y
npm i graphql @apollo/server bcryptjs jsonwebtoken
```

## DB

```sh
npm i prisma -D
npm i @prisma/client

# Create /prisma and prisma.config.ts
npx prisma init

#
# Add schema into schema.prisma
#

npx prisma migrate dev

npx prisma generate
```
