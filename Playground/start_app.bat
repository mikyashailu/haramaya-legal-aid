@echo off
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed. Please make sure Node.js is installed.
    pause
    exit /b %errorlevel%
)

echo Starting development server...
call npm run dev
pause
