import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { mcpApi, Tool, ExecuteResponse } from '@/lib/api';
import { useSSE, SSEMessage } from '@/hooks/useSSE';
import LoadingSpinner from '@/components/LoadingSpinner';
import JsonViewer from '@/components/JsonViewer';

export default function ToolExecutor() {
  const router = useRouter();
  const { appId, toolId } = router.query;
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [inputJson, setInputJson] = useState('{}');
  const [response, setResponse] = useState<ExecuteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  const responseRef = useRef<HTMLDivElement>(null);

  // SSE connection
  const streamUrl = appId && toolId 
    ? mcpApi.getStreamUrl(appId as string, toolId as string)
    : null;
    
  const { messages, isConnected, clearMessages } = useSSE(streamUrl, {
    onMessage: (message) => {
      // Auto-scroll to latest message
      if (responseRef.current) {
        responseRef.current.scrollTop = responseRef.current.scrollHeight;
      }
    },
  });

  useEffect(() => {
    if (appId && toolId && typeof appId === 'string' && typeof toolId === 'string') {
      fetchToolData(appId, toolId);
    }
  }, [appId, toolId]);

  const fetchToolData = async (appId: string, toolId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data - replace with actual API call
      const mockTool: Tool = {
        id: toolId,
        name: toolId,
        description: `Execute ${toolId} operation`,
        method: 'POST',
        endpoint: `/api/${appId}/${toolId}`,
        inputSchema: {
          type: 'object',
          properties: {
            example: { type: 'string', description: 'Example parameter' },
            optional: { type: 'number', description: 'Optional parameter' },
          },
          required: ['example'],
        },
      };
      
      setTool(mockTool);
      
      // Set initial JSON based on schema
      if (mockTool.inputSchema) {
        const exampleInput: any = {};
        if (mockTool.inputSchema.properties) {
          Object.entries(mockTool.inputSchema.properties).forEach(([key, prop]: [string, any]) => {
            if (mockTool.inputSchema.required?.includes(key)) {
              exampleInput[key] = prop.type === 'string' ? '' : prop.type === 'number' ? 0 : null;
            }
          });
        }
        setInputJson(JSON.stringify(exampleInput, null, 2));
      }
      
      // Uncomment for real API:
      // const data = await mcpApi.getTool(appId, toolId);
      // setTool(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tool data');
    } finally {
      setLoading(false);
    }
  };

  const validateJson = (value: string) => {
    try {
      JSON.parse(value);
      setJsonError(null);
      return true;
    } catch (err) {
      setJsonError('Invalid JSON format');
      return false;
    }
  };

  const handleInputChange = (value: string) => {
    setInputJson(value);
    if (value.trim()) {
      validateJson(value);
    } else {
      setJsonError(null);
    }
  };

  const handleExecute = async () => {
    if (!tool || !appId || !toolId || jsonError) return;
    
    try {
      setExecuting(true);
      setResponse(null);
      setError(null);
      clearMessages();
      
      const input = JSON.parse(inputJson);
      
      // Mock response - replace with actual API call
      const mockResponse: ExecuteResponse = {
        success: true,
        data: {
          message: 'Operation completed successfully',
          result: input,
          timestamp: new Date().toISOString(),
        },
        executionTime: Math.random() * 1000 + 500,
      };
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, mockResponse.executionTime));
      
      setResponse(mockResponse);
      
      // Uncomment for real API:
      // const result = await mcpApi.executeTool(appId as string, toolId as string, input);
      // setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed');
      setResponse({
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setExecuting(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getMessageTypeColor = (type: SSEMessage['type']) => {
    switch (type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error || 'Tool not found'}</p>
          <Link href={`/app/${appId}`} className="mt-2 btn-primary inline-block">
            Back to App
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{tool.name} - MCP Panel</title>
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
            <li>
              <Link href={`/app/${appId}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                {appId}
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium">{tool.name}</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="bg-white dark:bg-mcp-dark rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tool.name}
                </h1>
                <span className={`status-badge ${getMethodColor(tool.method)}`}>
                  {tool.method}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
              <div className="mt-3 flex items-center space-x-4">
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                  {tool.endpoint}
                </code>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isConnected ? 'Stream connected' : 'Stream disconnected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Input Parameters
            </h2>
            
            {tool.inputSchema && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Schema
                </h3>
                <JsonViewer data={tool.inputSchema} collapsed={2} />
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                JSON Input
              </h3>
              <textarea
                value={inputJson}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`w-full h-64 px-4 py-3 font-mono text-sm border rounded-lg 
                         bg-white dark:bg-mcp-dark text-gray-900 dark:text-white
                         ${jsonError 
                           ? 'border-red-500 focus:ring-red-500' 
                           : 'border-gray-300 dark:border-gray-600 focus:ring-mcp-primary'
                         } focus:ring-2 focus:border-transparent`}
                placeholder="Enter JSON input..."
              />
              {jsonError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{jsonError}</p>
              )}
            </div>
            
            <button
              onClick={handleExecute}
              disabled={executing || !!jsonError || !inputJson.trim()}
              className={`w-full btn-primary flex items-center justify-center space-x-2
                       ${executing || !!jsonError || !inputJson.trim() 
                         ? 'opacity-50 cursor-not-allowed' 
                         : ''}`}
            >
              {executing ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Executing...</span>
                </>
              ) : (
                <span>Execute Tool</span>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Output
            </h2>
            
            {/* Response */}
            {response && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Response
                </h3>
                <div className={`p-4 rounded-lg border ${
                  response.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`status-badge ${response.success ? 'status-success' : 'status-error'}`}>
                      {response.success ? 'Success' : 'Error'}
                    </span>
                    {response.executionTime && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {response.executionTime.toFixed(0)}ms
                      </span>
                    )}
                  </div>
                  <JsonViewer 
                    data={response.data || { error: response.error }} 
                    collapsed={false}
                  />
                </div>
              </div>
            )}
            
            {/* SSE Messages */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live Stream Logs
              </h3>
              <div 
                ref={responseRef}
                className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm"
              >
                {messages.length === 0 ? (
                  <p className="text-gray-500">No stream messages yet...</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                      <span className="text-gray-500">
                        [{new Date(msg.timestamp).toLocaleTimeString()}]
                      </span>
                      <span className={`ml-2 ${getMessageTypeColor(msg.type)}`}>
                        [{msg.type.toUpperCase()}]
                      </span>
                      <span className="ml-2 text-gray-300">{msg.message}</span>
                      {msg.data && (
                        <div className="ml-4 mt-1">
                          <JsonViewer data={msg.data} collapsed={true} />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}