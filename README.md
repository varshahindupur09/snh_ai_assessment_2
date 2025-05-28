# snh_ai_assessment_2

## Tree API – NodeJS Backend

This is the backend service for managing tree-structured data, built using **NestJS**, **Prisma**, and **PostgreSQL**. It provides RESTful endpoints for interacting with hierarchical data models.

## 📁 Project Structure
nodejs_backend/ <br />
└── tree-api/ <br />
├── src/ <br />
│ ├── tree/ # Tree module, service, controller <br />
│ ├── app.module.ts # Root module <br />
│ └── main.ts # App bootstrap <br />
├── prisma/ <br />
│ └── schema.prisma # Prisma schema <br />
├── .env # Environment variables <br />
├── package.json <br />
└── README.md <br />


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


## How to start project
### Backend: (First start)
cd snh_ai_assessment_2/nodejs_backend/tree-api
npm install
.env file: DATABASE_URL="postgresql://user:password@localhost:5432/tree_db"
npx prisma migrate dev --name init
npm run start:dev

### Frontend: (Next this)
cd snh_ai_assessment_2/retool-visual-ui
npm install
npm run dev -- -p 3001

## Screenshots:
<img width="981" alt="image" src="https://github.com/user-attachments/assets/134a00f3-46d8-449a-ae8c-5f3f3a8ee9c4" />

