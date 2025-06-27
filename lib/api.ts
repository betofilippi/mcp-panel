import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mcp-integrations-server.vercel.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface App {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  category?: string;
  enabled: boolean;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  inputSchema?: any;
  outputSchema?: any;
}

export interface ExecuteRequest {
  input: any;
}

export interface ExecuteResponse {
  success: boolean;
  data?: any;
  error?: string;
  executionTime?: number;
}

export const mcpApi = {
  // Apps
  async getApps(): Promise<App[]> {
    const { data } = await api.get<App[]>('/apps');
    return data;
  },

  async getApp(appId: string): Promise<App> {
    const { data } = await api.get<App>(`/apps/${appId}`);
    return data;
  },

  // Tools
  async getTools(appId: string): Promise<Tool[]> {
    const { data } = await api.get<Tool[]>(`/apps/${appId}/tools`);
    return data;
  },

  async getTool(appId: string, toolId: string): Promise<Tool> {
    const { data } = await api.get<Tool>(`/apps/${appId}/tools/${toolId}`);
    return data;
  },

  // Execute
  async executeTool(appId: string, toolId: string, input: any): Promise<ExecuteResponse> {
    const { data } = await api.post<ExecuteResponse>(
      `/apps/${appId}/tools/${toolId}/execute`,
      { input }
    );
    return data;
  },

  // SSE Stream URL
  getStreamUrl(appId: string, toolId: string): string {
    return `${API_BASE_URL}/apps/${appId}/tools/${toolId}/stream`;
  },
};