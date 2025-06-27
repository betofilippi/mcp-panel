import React from 'react';
import Head from 'next/head';

export default function Docs() {
  return (
    <>
      <Head>
        <title>Documentation - MCP Panel</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          MCP Panel Documentation
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">
              MCP Panel is a comprehensive dashboard for managing and testing Model Context Protocol (MCP) integrations. 
              It provides a user-friendly interface to interact with your MCP server, test tools, and monitor real-time 
              execution logs via Server-Sent Events (SSE).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Browse and search available MCP integrations</li>
              <li>View detailed information about each integration and its tools</li>
              <li>Execute tools with custom JSON input</li>
              <li>Real-time streaming logs via SSE</li>
              <li>Response visualization with JSON viewer</li>
              <li>Dark mode support</li>
              <li>Responsive design for mobile and desktop</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">GET /apps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Retrieve a list of all available MCP applications
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">GET /apps/:appId/tools</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get all tools available for a specific application
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">POST /apps/:appId/tools/:toolId/execute</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Execute a specific tool with the provided input
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">GET /apps/:appId/tools/:toolId/stream</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Server-Sent Events endpoint for real-time logs
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">SSE Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The panel supports real-time log streaming through Server-Sent Events. When executing a tool, 
              the panel automatically connects to the SSE endpoint to receive live updates about the execution progress.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
{`// SSE Message Format
{
  "id": "unique-message-id",
  "type": "log" | "error" | "success" | "info",
  "message": "Log message content",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": { /* optional additional data */ }
}`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Deployment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The MCP Panel is optimized for deployment on Vercel and configured to use the domain 
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">mcp.plataforma.app</code>.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Quick Deploy</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Push the project to GitHub</li>
              <li>Import the repository in Vercel</li>
              <li>Configure environment variables if needed</li>
              <li>Deploy and configure custom domain in GoDaddy</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
{`NEXT_PUBLIC_API_URL=https://mcp-integrations-server.vercel.app`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To add new integrations to the MCP Panel, simply update your MCP server with new tools 
              following the standard MCP protocol. The panel will automatically discover and display 
              new integrations.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}