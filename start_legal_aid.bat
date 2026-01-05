@echo off
echo Starting Haramaya Legal Aid Application...
echo.

set "NODE_PATH=C:\Program Files\nodejs"
set "PATH=%NODE_PATH%;%PATH%"

cd /d "%~dp0"

echo Installing dependencies (if needed)...
"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npm-cli.js" install

echo.
echo Starting development server...
echo Application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npm-cli.js" run dev

pause
