#!/bin/bash

# FitSphere Quick Setup Script

echo "🏋️ FitSphere - Setup Script"
echo "=============================="
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env file - update with your MongoDB URI"
fi

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env file"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Run: cd backend && npm run dev (Terminal 1)"
echo "3. Run: cd frontend && npm run dev (Terminal 2)"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "💡 Optional: Seed database with npm run seed in backend directory"
