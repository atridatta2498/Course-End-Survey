@echo off
echo Starting CES Development Environment...
echo.

echo Installing root dependencies...
call npm install

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo Starting both frontend and backend...
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.

start "Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Development servers started!
echo Press any key to exit...
pause >nul
