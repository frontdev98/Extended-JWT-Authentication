# Extented-JWT-Authentication

The project demonstrates user authentication based on JWT (Json Web Token).
The basis of the project is taken from youtube channel [UlbiTV](https://www.youtube.com/watch?v=fN25fMQZ2v0&t=5160s&ab_channel=UlbiTV).

## Project Stack

Environment:

- Ubuntu 22.04
- Windows 11 Pro 24H2

Base:

- [Node v22.16.0](https://nodejs.org/en/blog/release/v22.16.0)
- [PostgreSQL 14.18](https://www.postgresql.org/about/news/postgresql-175-169-1513-1418-and-1321-released-3072/)
- [Openssl 3.2.4](https://www.openssl.org/)
- [Vite 6.3.5](https://vite.dev/)

Modules:

- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [react](https://www.npmjs.com/package/react)
- [prisma](https://www.prisma.io/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [winston](https://www.npmjs.com/package/winston)
- [axios](https://www.npmjs.com/package/axios)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)

Tools:

- [Postman](https://www.postman.com/)
- [Httpie](https://httpie.io/)

## Features

## Get started

Clone the project and go to its directory:

```bash
git clone https://github.com:frontdev98/Extended-JWT-Authentication.git
```

```bash
cd Extended-JWT-Authentication
```

Install dependencies

```bash
cd server && npm i
cd ../client && npm i
cd ..
```

Create file **Extended-JWT-Authentication/server/.env** and insert next strings:

```bash
# Your database's parameters
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE/?schema=SCHEMA"

# Application port
PORT=5000
```

Run database migration using Prisma:

```bash
npx prisma migrate dev
```

Generate database's objects in JS/TS code using Prisma:

```bash
npx prisma generate
```
