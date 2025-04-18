@echo off
echo ======================================
echo Book App Network Diagnostics
echo ======================================
echo.

echo Checking if server is running...
netstat -an | findstr /c:"TCP    127.0.0.1:5000"
if %errorlevel% == 0 (
  echo Server is running on port 5000
) else (
  echo Server does not appear to be running on port 5000
  echo.
  echo Would you like to start the server? (Y/N)
  set /p startChoice=
  if /i "%startChoice%"=="Y" (
    echo Starting server...
    start cmd /k "cd server && npm run dev"
    timeout /t 5
  )
)

echo.
echo Checking if client is running...
netstat -an | findstr /c:"TCP    127.0.0.1:5173"
if %errorlevel% == 0 (
  echo Client is running on port 5173
) else (
  echo Client does not appear to be running on port 5173
  echo.
  echo Would you like to start the client? (Y/N)
  set /p clientChoice=
  if /i "%clientChoice%"=="Y" (
    echo Starting client...
    start cmd /k "cd client && npm run dev"
    timeout /t 5
  )
)

echo.
echo Running API connectivity test...
node diagnose.js

echo.
echo ======================================
echo Network Diagnostics Complete
echo ======================================
echo.
echo If you are still experiencing issues:
echo 1. Make sure your OpenAI API key is configured in server/.env
echo 2. Check if your firewall is blocking the connections
echo 3. Try restarting both client and server
echo.
pause 