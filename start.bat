@echo off
echo Starting Book Recommender Application...

REM Start the server
start cmd /k "cd server && npm run dev"

REM Start the client
start cmd /k "cd client && npm run dev"

echo Application started!
echo Server: http://localhost:5000
echo Client: http://localhost:5173 