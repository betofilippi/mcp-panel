import React from 'react';
import Link from 'next/link';
import { App } from '@/lib/api';

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <Link href={`/app/${app.id}`}>
      <div className="bg-white dark:bg-mcp-dark rounded-xl shadow-md card-hover cursor-pointer overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {app.logoUrl ? (
              <img 
                src={app.logoUrl} 
                alt={`${app.name} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {app.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {app.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {app.description}
              </p>
              
              <div className="mt-3 flex items-center space-x-3">
                {app.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {app.category}
                  </span>
                )}
                
                <span className={`status-badge ${app.enabled ? 'status-success' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {app.enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-mcp-primary dark:text-mcp-secondary font-medium">
            View Tools →
          </span>
        </div>
      </div>
    </Link>
  );
}