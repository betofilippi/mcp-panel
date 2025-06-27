import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { mcpApi, App, Tool } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AppDetails() {
  const router = useRouter();
  const { appId } = router.query;
  
  const [app, setApp] = useState<App | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');

  useEffect(() => {
    if (appId && typeof appId === 'string') {
      fetchAppData(appId);
    }
  }, [appId]);

  const fetchAppData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data - replace with actual API calls
      const mockApp: App = {
        id: id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        description: `Integration for ${id} with multiple tools`,
        logoUrl: `/logos/${id}.png`,
        category: 'Integration',
        enabled: true,
      };
      
      const mockTools: Tool[] = [
        {
          id: `${id}_list`,
          name: `${id}_list_items`,
          description: `List all items from ${id}`,
          method: 'GET',
          endpoint: `/api/${id}/items`,
          inputSchema: {},
        },
        {
          id: `${id}_create`,
          name: `${id}_create_item`,
          description: `Create a new item in ${id}`,
          method: 'POST',
          endpoint: `/api/${id}/items`,
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
            },
            required: ['name'],
          },
        },
        {
          id: `${id}_update`,
          name: `${id}_update_item`,
          description: `Update an existing item in ${id}`,
          method: 'PUT',
          endpoint: `/api/${id}/items/:id`,
          inputSchema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
            },
            required: ['id'],
          },
        },
        {
          id: `${id}_delete`,
          name: `${id}_delete_item`,
          description: `Delete an item from ${id}`,
          method: 'DELETE',
          endpoint: `/api/${id}/items/:id`,
          inputSchema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
            required: ['id'],
          },
        },
      ];
      
      setApp(mockApp);
      setTools(mockTools);
      
      // Uncomment for real API:
      // const [appData, toolsData] = await Promise.all([
      //   mcpApi.getApp(id),
      //   mcpApi.getTools(id),
      // ]);
      // setApp(appData);
      // setTools(toolsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch app data');
    } finally {
      setLoading(false);
    }
  };

  const methods = ['all', 'GET', 'POST', 'PUT', 'DELETE'];
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || tool.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error || 'App not found'}</p>
          <Link href="/" className="mt-2 btn-primary inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{app.name} - MCP Panel</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Dashboard
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium">{app.name}</li>
          </ol>
        </nav>

        {/* App Header */}
        <div className="bg-white dark:bg-mcp-dark rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-start space-x-4">
            {app.logoUrl ? (
              <img 
                src={app.logoUrl} 
                alt={`${app.name} logo`}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {app.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {app.name}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {app.description}
              </p>
              <div className="mt-3 flex items-center space-x-3">
                {app.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {app.category}
                  </span>
                )}
                <span className={`status-badge ${app.enabled ? 'status-success' : 'bg-gray-100 text-gray-800'}`}>
                  {app.enabled ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tools.length} tools available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-mcp-dark text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-mcp-primary focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-mcp-dark text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-mcp-primary focus:border-transparent"
            >
              {methods.map(method => (
                <option key={method} value={method}>
                  {method === 'all' ? 'All Methods' : method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tools List */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No tools found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map(tool => (
              <div 
                key={tool.id}
                className="bg-white dark:bg-mcp-dark rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className={`status-badge ${getMethodColor(tool.method)}`}>
                        {tool.method}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                    <div className="mt-2">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {tool.endpoint}
                      </code>
                    </div>
                  </div>
                  <Link
                    href={`/app/${appId}/tool/${tool.id}`}
                    className="btn-primary ml-4"
                  >
                    Test Tool
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}