import React from 'react';
import dynamic from 'next/dynamic';

const JsonView = dynamic(() => import('@uiw/react-json-view').then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 rounded h-20"></div>
});

interface JsonViewerProps {
  data: any;
  name?: string;
  collapsed?: boolean;
  theme?: string;
}

export default function JsonViewer({ data, name, collapsed = false, theme = 'github' }: JsonViewerProps) {
  return (
    <div className="json-viewer overflow-auto max-h-96 p-4 bg-gray-50 rounded-lg">
      <JsonView 
        value={data}
        collapsed={collapsed ? 1 : false}
        displayDataTypes={false}
        displayObjectSize={false}
        style={{
          '--w-rjv-font-family': 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
          '--w-rjv-color': '#1e293b',
          '--w-rjv-background-color': 'transparent',
          '--w-rjv-border-color': '#e2e8f0',
          '--w-rjv-border-radius': '0.375rem',
          '--w-rjv-line-height': '1.5',
          fontSize: '0.875rem'
        }}
      />
    </div>
  );
}
