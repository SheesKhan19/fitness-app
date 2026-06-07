@echo off
REM FitSphere Quick Setup Script for Windows

echo.
echo 7K FitSphere - Setup Script
echo ==============================
echo.

REM Backend Setup
echo 1/4 Setting up Backend...
cd backend
call npm install

REM Create .env if it doesn't exist
if not exist .env (
  copy .env.example .env
  echo [OK] Created .env file - update with your MongoDB URI
)

cd ..

REM Frontend Setup
echo.
echo 2/4 Setting up Frontend...
cd frontend
call npm install

REM Create .env if it doesn't exist
if not exist .env (
  copy .env.example .env
  echo [OK] Created .env file
)

cd ..

echo.
echo [OK] Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI
echo 2. Run: cd backend ^&^& npm run dev (Terminal 1)
echo 3. Run: cd frontend ^&^& npm run dev (Terminal 2)
echo 4. Open http://localhost:5173 in your browser
echo.
echo Optional: Seed database with npm run seed in backend directory
