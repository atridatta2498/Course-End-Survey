# CES Frontend

This is the frontend React application for the Course End Survey system.

## Features

- Student feedback form with auto-refresh functionality
- Admin dashboard with survey results
- PDF report generation
- Responsive design with modern UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
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
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000/api
```

**Note**: For production, update these URLs to point to your production backend server.

### Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── images/      # Image assets
│   ├── App.js       # Main app component
│   ├── index.js     # Entry point
│   └── ...
├── package.json
└── README.md
```

## Technologies Used

- React 19
- React Router DOM
- Styled Components
- jsPDF (for report generation)
- React Icons
