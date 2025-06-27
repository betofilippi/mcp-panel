import React from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface JsonViewerProps {
  data: any;
  name?: string;
  collapsed?: boolean | number;
  theme?: 'monokai' | 'solarized' | 'tomorrow' | 'twilight' | 'paraiso' | 'chalk';
}

export default function JsonViewer({ 
  data, 
  name = 'root', 
  collapsed = 1,
  theme = 'monokai' 
}: JsonViewerProps) {
  return (
    <div className="json-viewer">
      <ReactJson
        src={data}
        name={name}
        collapsed={collapsed}
        theme={theme}
        displayDataTypes={false}
        displayObjectSize={true}
        enableClipboard={true}
        style={{
          backgroundColor: 'transparent',
          fontSize: '14px',
        }}
      />
    </div>
  );
}