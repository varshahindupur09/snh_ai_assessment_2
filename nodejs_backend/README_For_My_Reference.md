# Instructions Readme

brew install postgresql

brew services start postgresql

psql postgres

psql -h localhost -p 5433 -U postgres

password: Vrsh@789

CREATE USER "user" WITH PASSWORD 'password';

CREATE DATABASE mydatabase OWNER "user";

GRANT ALL PRIVILEGES ON DATABASE mydatabase TO "user";

env:

DATABASE_URL=postgresql://user:password@localhost:5433/mydatabase

more:

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "user";

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "user";


enter into DB:

psql -h localhost -p 5433 -U user -d mydatabase

# (password: password)


# base:
(base) varshahindupur@Varshas-MacBook-Air snh_ai_assessment % cd nodejs_backend 

(base) varshahindupur@Varshas-MacBook-Air nodejs_backend % cd tree-api 

(base) varshahindupur@Varshas-MacBook-Air tree-api % npx prisma generate

# issue:
rm package.json package-lock.json

npm init -y

nest update project

npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs

npm install prisma @prisma/client

npm install --save-dev @nestjs/cli typescript ts-node


# frontend
npx create-next-app retool-visucdal-ui --typescript --tailwind

cd retool-visual-ui

npx shadcn-ui@latest init

npm install @shadcn/ui react-flow-renderer

npm run dev

## For LLM:
npm install class-validator class-transformer

npm install @aws-sdk/client-lambda

## Swagger
npm install --save @nestjs/swagger swagger-ui-express
