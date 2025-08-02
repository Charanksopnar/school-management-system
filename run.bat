@echo off
echo Starting School Management System...

echo Installing dependencies...
call npm run install-all

echo Starting the application...
call npm run dev

pause
