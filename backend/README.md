# CES Backend

This is the backend API server for the Course End Survey system.

## Features

- RESTful API endpoints
- MySQL database integration
- Authentication and authorization
- Survey data management
- PDF report generation support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ces_database

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# API Configuration
API_BASE_URL=http://localhost:5000
```

### Database Setup

1. Create the MySQL database:
```sql
CREATE DATABASE ces_database;
```

2. Run the schema file:
```bash
mysql -u your_username -p ces_database < db/schema.sql
```

### Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Survey Management
- `GET /api/auth/questions` - Get survey questions
- `GET /api/auth/admin/results` - Get survey results
- `POST /api/auth/submit` - Submit survey response

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── routes/          # API routes
├── db/             # Database schema and migrations
├── database/       # Database files
├── server.js       # Main server file
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MySQL2
- bcrypt (password hashing)
- CORS
- dotenv (environment variables)
