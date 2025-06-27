import React from 'react';
import dynamic from 'next/dynamic';

const JsonView = dynamic(() => import('@uiw/react-json-view'), { 
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
      />
    </div>
  );
}
