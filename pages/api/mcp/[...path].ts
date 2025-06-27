import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'https://mcp-integrations-server.vercel.app';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;

  try {
    // Forward the request to the MCP server
    const response = await axios({
      method: req.method,
      url: `${MCP_SERVER_URL}/${endpoint}`,
      headers: {
        ...req.headers,
        host: undefined, // Remove host header
        'x-forwarded-for': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      },
      data: req.body,
      params: req.query,
      validateStatus: () => true, // Don't throw on any status
    });

    // Forward the response
    res.status(response.status);
    
    // Copy headers
    Object.entries(response.headers).forEach(([key, value]) => {
      if (key.toLowerCase() !== 'transfer-encoding') {
        res.setHeader(key, value as string);
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error('MCP Proxy Error:', error);
    res.status(500).json({
      error: 'Failed to proxy request',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Disable body parsing to handle raw payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};