import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { mcpApi, App } from '@/lib/api';
import AppCard from '@/components/AppCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Dashboard() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulated data for now - replace with actual API call
      const mockApps: App[] = [
        {
          id: 'nocodb',
          name: 'NocoDB',
          description: 'Open source Airtable alternative - 57 tools for database management',
          logoUrl: '/logos/nocodb.png',
          category: 'Database',
          enabled: true,
        },
        {
          id: 'bling',
          name: 'Bling ERP',
          description: 'Complete ERP system with 123 tools for business management',
          logoUrl: '/logos/bling.png',
          category: 'ERP',
          enabled: true,
        },
        {
          id: 'zapi',
          name: 'Z-API WhatsApp',
          description: 'WhatsApp Business API with 74 tools for messaging automation',
          logoUrl: '/logos/zapi.png',
          category: 'Communication',
          enabled: true,
        },
        {
          id: 'supabase',
          name: 'Supabase',
          description: 'Open source Firebase alternative - 62 tools for backend services',
          logoUrl: '/logos/supabase.png',
          category: 'Backend',
          enabled: true,
        },
        {
          id: 'instagram',
          name: 'Instagram',
          description: 'Instagram Business API with 50 tools for social media management',
          logoUrl: '/logos/instagram.png',
          category: 'Social Media',
          enabled: true,
        },
        {
          id: 'facebook',
          name: 'Facebook',
          description: 'Facebook Graph API with 40 tools for pages and ads management',
          logoUrl: '/logos/facebook.png',
          category: 'Social Media',
          enabled: true,
        },
        {
          id: 'godaddy',
          name: 'GoDaddy',
          description: 'Domain management with 35 tools for DNS and hosting',
          logoUrl: '/logos/godaddy.png',
          category: 'Domain',
          enabled: true,
        },
        {
          id: 'github',
          name: 'GitHub',
          description: 'Version control with 22 tools for repository management',
          logoUrl: '/logos/github.png',
          category: 'Development',
          enabled: true,
        },
        {
          id: 'vercel',
          name: 'Vercel',
          description: 'Deployment platform with 31 tools for hosting and CI/CD',
          logoUrl: '/logos/vercel.png',
          category: 'Hosting',
          enabled: true,
        },
      ];
      setApps(mockApps);
      // Uncomment for real API:
      // const data = await mcpApi.getApps();
      // setApps(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apps');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(apps.map(app => app.category).filter(Boolean))];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>MCP Panel - Dashboard</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            MCP Integrations Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and test your Model Context Protocol integrations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-mcp-dark rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-mcp-primary">{apps.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Apps</div>
          </div>
          <div className="bg-white dark:bg-mcp-dark rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">
              {apps.filter(app => app.enabled).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Apps</div>
          </div>
          <div className="bg-white dark:bg-mcp-dark rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">807+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Tools</div>
          </div>
          <div className="bg-white dark:bg-mcp-dark rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-mcp-dark text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-mcp-primary focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-mcp-dark text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-mcp-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={fetchApps}
              className="mt-2 btn-primary"
            >
              Retry
            </button>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No apps found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}