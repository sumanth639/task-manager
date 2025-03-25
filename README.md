# Task Manager 📋

![Task Manager Screenshot](https://github.com/sumanth639/task-manager/blob/c81738809983179809b1757c3f2d0516c436d964/App%20preview.png)

## Overview

Task Manager is a comprehensive web application designed to help users efficiently organize and manage their tasks. Built with modern web technologies, the app provides a seamless task management experience with robust features and a user-friendly interface.

## 🌟 Features

### User Authentication

- Secure user registration and login system
- Protected routes for personalized task management

### Task Management

- Create, update, and delete tasks with ease
- Advanced filtering capabilities
  - Filter by status: TODO, IN_PROGRESS, COMPLETED
  - Filter by type: Remote, In Person

### Task Details

Comprehensive task tracking including:

- Title
- Description
- Due date
- Priority levels
- Attachment support

### Responsive Design

- Fully functional on desktop and mobile devices
- Adaptive and responsive layout

## 🛠 Technologies Used

### Frontend

- React
- Tailwind CSS
- Vite
- Lucide React (Icons)

### Backend

- Express.js
- MongoDB
- Mongoose (ODM)

### Authentication

- JSON Web Tokens (JWT)

### Development Tools

- Postman (API Testing)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Variables

#### Backend (.env)

```plaintext
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
PORT=5000
```

#### Frontend (.env)

```plaintext
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start the Application

#### Start Backend Server

```bash
cd backend
npm start
```

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

## 🌐 API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | User login           |
| GET    | `/api/tasks`         | Retrieve all tasks   |
| POST   | `/api/tasks`         | Create new task      |
| PUT    | `/api/tasks/:id`     | Update existing task |
| DELETE | `/api/tasks/:id`     | Delete a task        |

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## 📞 Contact

Sumanth S - sumanth1659@gmail.com

Happy Task Managing! 🚀
