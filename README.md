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
  
- **File Uploads (TODO STILL)**
  - Upload and attach files to tasks using `multer`.
  - Supports file types like images and PDFs with size restrictions.