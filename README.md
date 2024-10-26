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

## API Endpoints

### User Authentication & Management
- `POST` /api/user/register - Register a new user
- `POST` /api/user/login - Log in with user credentials
- `POST` /api/user/logout - Logout user
- `GET` /api/user/profile - Get user profile
- `PUT` /api/user/profile - Update user profile
- `DELETE` /api/user/profile - Delete user profile


### Task Management
- `POST` /api/tasks - Create a new task
- `GET` /api/tasks - Retrieve all tasks with filtering, sorting, and searching options
- `GET` /api/tasks/:taskId - Retrieve a particular task
- `PUT` /api/tasks/:taskId - Update a task
- `DELETE` /api/tasks/:taskId - Delete a task
- `POST` /api/tasks/:taskId/comments - Add a comment to a task
- `POST` /api/tasks/:taskId/attachments - Add file attachments to a task

### Team/Project Collaboration
- `POST` /api/teams/create - Create a new team
- `POST` /api/teams/:teamId/join - Join an existing team
- `GET` /api/teams/:teamId - Get team details
- `POST` /api/teams/:teamId/invite - Add a member to a team

## Usage

- **Register a User**: Use the registration endpoint to create a new user.
- **Log In**: Use login to obtain a JWT token, which must be sent in the Authorization header for protected endpoints.
- **Task Operations**: Create, update, delete, and view tasks. Add comments and attachments to tasks for collaboration.
- **Teams**: Create teams, add/remove members, and manage team details.