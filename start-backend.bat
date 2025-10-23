@echo off
echo Starting CES Backend...
echo.

echo Installing backend dependencies...
call npm install

echo.
echo Starting backend server...
echo Backend will be available at: http://localhost:5000
echo.

cd backend
call npm start
