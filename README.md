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
1. Clone the project and go to its directory:

```bash
git clone https://github.com:frontdev98/Extended-JWT-Authentication.git
```

```bash
cd extended-jwt-auth
```

2. Install dependencies
```bash
cd server && npm i
cd ../client && npm i
cd ..
```

3. Create new user and its database at PostgreSQL, for example:

```bash
sudo -u postgres psql
```

```sql
CREATE USER userName WITH PASSWORD 'yourPassword' LOGIN;
CREATE DATABASE userName WITH OWNER=userName;
```

4. Create file "**jwt-extended-auth/server/.env**" and add next strings to it:

```bash
DB_HOST="localhost"    # postgresql server's address
DB_PORT=5432           # default port
DB_USER="yourUsername" # your created user from step 2
DB_PASS="yourPassword" # your created password for the user from step 2
DB_NAME="databaseName" # created database from step 2

PORT=5000 # The server will run on 5000 port, you can change

JWT_ACCESS_SECRET=$(openssl rand -base64 32)  # Generate 256-bit key for access token
JWT_REFRESH_SECRET=$(openssl rand -base64 32) # Generate 256-bit key for refresh token

NODE_ENV=dev                 # Change it to "prod" if you don't want to see logs on console
LOG_PATH='jwt-auth-log.json' # Path to log file (default "extended-jwt-auth/jwt-auth-log.json")
```

## Tests