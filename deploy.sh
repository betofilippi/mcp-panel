#!/bin/bash

echo "🚀 Deploying MCP Panel to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📌 Next steps:"
echo "1. Configure custom domain in Vercel dashboard"
echo "2. Add mcp.plataforma.app domain"
echo "3. Update GoDaddy DNS settings:"
echo "   - Type: A"
echo "   - Name: mcp"
echo "   - Value: 76.76.21.21"
echo ""
echo "🌐 Your panel will be available at: https://mcp.plataforma.app"