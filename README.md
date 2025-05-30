# 📋 TaskTracks – Project & Task Management App (Next.js ⦾ NestJS ⦾ PostgreSQL)

TaskTracks is a modern fullstack **project and task management application**. Built with **PostgreSQL ⦾ NestJS ⦾ Next.js**, it enables teams to manage tasks, boards, and workflows effectively with a user-friendly UI and robust backend.

---

## 🌐 Live Demo

[👉 Try the app live](https://tasktracks.johnlodantojot.pro/)

```bash
https://tasktracks.johnlodantojot.pro/
```

---

## 🧪 Tech Stack

* **Frontend:** Next.js, React.js, TailwindCSS, TypeScript, Dnd
* **Backend:** NestJS, PostgreSQL
* **ORM:** Prisma
* **State Management:** Redux, RTK Query
* **Auth:** JWT-based authentication using cookies
* **API Pattern:** RESTful

---

## 📦 Core Features

* 🧱 **Project Boards** – Create boards with dynamic stages (To Do, In Progress, etc.)
* 🧲 **Drag-and-Drop Tasks** – Move tasks between stages easily using Dnd
* 👥 **Multi-user Collaboration** – Invite members and work on shared boards
* 🧠 **PostgreSQL + Prisma** – Scalable relational database setup
* 🧰 **NestJS Modular Backend** – Service/controller-based architecture with guards and interceptors
* 🎨 **Responsive UI** – Modern layout using TailwindCSS and clean React components
* 🔐 **Secure Auth** – Login, register, and manage sessions with secure cookies
* 🗃️ **Organized Codebase** – Follows best practices for scalable project structure

---

## 🧬 Getting Started

Make sure [Node.js](https://nodejs.org/en/download) and [PostgreSQL](https://www.postgresql.org/download/) are installed.

### 1. Clone the Repository

```bash
git clone https://github.com/johnlodan/tasktracks-nextjs-nestjs-postgresql.git
```

### 2. Install Dependencies

```bash
cd tasktracks-nextjs-nestjs-postgresql
npm install
```

### 3. Environment Setup

Create `.env` files in both `/web` and `/api` directories with required variables (e.g. database URL, JWT secrets).

### 4. Run the Backend

```bash
cd api
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 5. Run the Frontend

```bash
cd web
npm run dev
```

---

## 🔍 Preview

![TaskTracks Preview](https://github.com/johnlodan/tasktracks-nextjs-nestjs-postgresql/blob/main/docs/poc.gif)

---

## 📄 License

MIT License – Free to use for personal or commercial projects.

---


Built with ❤️ by [johnlodan](https://github.com/johnlodan)
