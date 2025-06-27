# MCP Panel

A modern dashboard for managing and testing Model Context Protocol (MCP) integrations.

![MCP Panel](https://mcp.plataforma.app/screenshot.png)

## Features

- 🚀 **Integration Dashboard**: Browse and search all available MCP integrations
- 🛠️ **Tool Testing**: Execute tools with custom JSON input and see real-time results
- 📊 **Live Streaming**: Monitor execution logs in real-time via Server-Sent Events (SSE)
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support
- ⚡ **Fast**: Optimized for performance with Next.js and Vercel

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel

1. Push this project to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy (no configuration needed)

### Configure Custom Domain

1. In Vercel, go to Project Settings > Domains
2. Add `mcp.plataforma.app`
3. In GoDaddy, configure DNS:
   - Type: A
   - Name: mcp
   - Value: Vercel's IP (76.76.21.21)
   - Or use CNAME with Vercel's domain

## Architecture

```
mcp-panel/
├── pages/                    # Next.js pages
│   ├── index.tsx            # Dashboard
│   ├── app/[appId].tsx      # App details
│   └── app/[appId]/tool/[toolId].tsx  # Tool executor
├── components/              # React components
├── hooks/                   # Custom React hooks
│   └── useSSE.ts           # SSE connection hook
├── lib/                    # Utilities
│   └── api.ts             # API client
└── styles/                # Global styles
    └── globals.css        # Tailwind CSS
```

## API Integration

The panel connects to the MCP Integration Server at:
```
https://mcp-integrations-server.vercel.app
```

### Endpoints Used

- `GET /apps` - List all applications
- `GET /apps/:appId/tools` - List tools for an app
- `POST /apps/:appId/tools/:toolId/execute` - Execute a tool
- `GET /apps/:appId/tools/:toolId/stream` - SSE stream for logs

## SSE (Server-Sent Events)

The panel supports real-time log streaming. When executing a tool, it automatically connects to the SSE endpoint to receive live updates.

### Message Format

```typescript
interface SSEMessage {
  id: string;
  type: 'log' | 'error' | 'success' | 'info';
  message: string;
  timestamp: string;
  data?: any;
}
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://mcp-integrations-server.vercel.app
```

## Technology Stack

- **Framework**: Next.js 14
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **API**: Axios + SWR
- **SSE**: @microsoft/fetch-event-source
- **JSON Viewer**: react-json-view
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for the MCP community