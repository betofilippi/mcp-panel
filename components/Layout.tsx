import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-mcp-darker">
      {/* Header */}
      <header className="bg-white dark:bg-mcp-dark shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  MCP Panel
                </h1>
              </Link>
              
              <nav className="ml-10 flex space-x-4">
                <Link 
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === '/' 
                      ? 'text-mcp-primary dark:text-mcp-secondary' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-mcp-primary dark:hover:text-mcp-secondary'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/docs"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === '/docs' 
                      ? 'text-mcp-primary dark:text-mcp-secondary' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-mcp-primary dark:hover:text-mcp-secondary'
                  }`}
                >
                  Docs
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/yourusername/mcp-panel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-mcp-dark border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 MCP Panel. Connected to{' '}
              <a 
                href="https://mcp-integrations-server.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mcp-primary hover:text-purple-700"
              >
                MCP Integrations Server
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by{' '}
              <span className="font-semibold">mcp.plataforma.app</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}