# snh_ai_assessment_2

## Tree API – NodeJS Backend

This is the backend service for managing tree-structured data, built using **NestJS**, **Prisma**, and **PostgreSQL**. It provides RESTful endpoints for interacting with hierarchical data models.

## 📁 Project Structure
nodejs_backend/
└── tree-api/
├── src/
│ ├── tree/ # Tree module, service, controller
│ ├── app.module.ts # Root module
│ └── main.ts # App bootstrap
├── prisma/
│ └── schema.prisma # Prisma schema
├── .env # Environment variables
├── package.json
└── README.md


## 🚀 Features

- Create, update, and delete tree nodes
- Retrieve nested children or entire tree structures
- Designed for persistence with PostgreSQL
- Built with scalable NestJS architecture

## ⚙️ Technologies Used

- [NestJS](https://nestjs.com/) – Progressive Node.js framework
- [Prisma ORM](https://www.prisma.io/) – Type-safe DB access
- [PostgreSQL](https://www.postgresql.org/) – Relational DB

## 🛠️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/yourusername/snh_ai_assessment_2.git
cd snh_ai_assessment_2/nodejs_backend/tree-api
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment

Create a .env file containing:
```
DATABASE_URL="postgresql://user:password@localhost:5432/tree_db"
```

### 4. Run database migrations

```
npx prisma migrate dev --name init
```

### 5. Start the server

```
npm run start:dev
Server will start at http://localhost:3000.
```

## API Endpoints

| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| GET    | `/tree`     | Fetch entire tree           |
| POST   | `/tree`     | Add a new node              |
| GET    | `/tree/:id` | Get a node and its children |
| PATCH  | `/tree/:id` | Update a node               |
| DELETE | `/tree/:id` | Delete a node               |




