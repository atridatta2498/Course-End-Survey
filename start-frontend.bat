@echo off
echo Starting CES Frontend...
echo.

echo Installing frontend dependencies...
call npm install

echo.
echo Starting frontend development server...
echo Frontend will be available at: http://localhost:3000
echo.

cd frontend
call npm start
