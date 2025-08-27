#!/bin/bash

echo "🧪 Testing SupplySight Dashboard Setup..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from project root."
    exit 1
fi

echo "✅ Project structure verified"

# Test server dependencies
cd server
if [ ! -f "package.json" ]; then
    echo "❌ Error: Server package.json not found"
    exit 1
fi

echo "✅ Server configuration found"

# Install server dependencies
echo "📦 Installing server dependencies..."
npm install --silent

# Test server startup (background)
echo "🚀 Testing GraphQL server startup..."
timeout 10 node index.js &
SERVER_PID=$!
sleep 3

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ GraphQL server started successfully"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
fi

cd ..

echo "🎉 Module 1 setup verification complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm start' to start both server and client"
echo "2. Access dashboard at http://localhost:5173"
echo "3. Access GraphQL playground at http://localhost:4000/graphql"
echo "4. Ready to implement Module 2!"
