# Task Tracking and Management Application

This is a backend system for a Task Tracking and Management Application developed using Node.js, Express.js, and MongoDB. The application allows users to create, assign, and track tasks, collaborate with team members through comments and attachments, and manage projects/teams.

## Features

- **User Authentication & Management**
  - Secure user registration, login, and logout.
  - Password hashing using `bcrypt`.
  - JWT-based authentication for session management.
  - Profile management with CRUD operations.
  
- **Task Management**
  - Create, update, delete, and retrieve tasks.
  - Assign tasks to team members.
  - Task filtering, sorting, and searching.
  - Comments and attachments feature for collaboration.
  
- **Team/Project Collaboration**
  - Create or join teams.
  - Add/remove members from a team.
  - Retrieve team details and member information.
  
- **File Uploads ( --- In Progress ---)**
  - Upload and attach files to tasks using `multer`.
  - Supports file types like images and PDFs with size restrictions.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud-based like MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-repo/task-tracking-app.git
  cd task-tracking-app
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Set up environment variables by creating a `.env` file in the root directory:
  ```makefile
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```

4. Create an uploads folder in the root directory to store file attachments:
  ```bash
  mkdir uploads
  ```

5. Run the server:
  ```bash
  npm start
  ```

