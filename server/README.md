# Hospital Management System

## Description
A full-stack web application for managing hospital operations, including patient records, appointments, multi-role user authentication, dashboards, and secure document management.

## Technologies Used
- **Frontend**: React.js (Vite, running on http://localhost:5175)
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Setup Instructions

1. **Clone the repository to your local machine.**
2. **Install frontend dependencies:**
    ```
    cd client
    npm install
    ```
3. **Install backend dependencies:**
    ```
    cd ../server
    npm install
    ```
4. **Set up the MySQL database:**
    - Create a database named `hospital_management` in MySQL.
    - Run the SQL scripts provided in `server/schema.sql` to create the required tables.
5. **Create a `.env` file in `/server` with your MySQL connection details:**
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=hospital_management
    ```
6. **Start the backend server:**
    ```
    node server.js
    ```
7. **Start the frontend server:**
    ```
    cd ../client
    npm run dev
    ```
8. **Open your browser and visit:**  
   [http://localhost:5175](http://localhost:5175)

## Features

- Multi-role login (admin, doctor, nurse, receptionist, patient)
- Role-based individual dashboards and access permissions
- CRUD operations for users, patients, doctors, appointments, and documents
- Document upload and download (prescriptions, medical reports, test results)
- Secure user authentication and authorization
- Responsive user interface

## Project Structure

hospital-management-system/
client/ # React frontend
server/ # Node.js backend and SQL schema
schema.sql # MySQL database schema
models/ # JS ORM models (if any)
.env.example # Example environment file for DB connection


## Author

Rohan Waghmare

