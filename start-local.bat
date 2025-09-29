@echo off
echo.
echo ====================================
echo   CyberShield Local Development
echo ====================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo Open your browser to http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause