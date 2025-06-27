import type { NextApiRequest, NextApiResponse } from 'next';
import { App } from '@/lib/api';

// Mock data for demonstration - replace with actual data from your MCP server
const mockApps: App[] = [
  {
    id: 'nocodb',
    name: 'NocoDB',
    description: 'Open source Airtable alternative - 57 tools for database management',
    logoUrl: 'https://app.nocodb.com/favicon.ico',
    category: 'Database',
    enabled: true,
  },
  {
    id: 'bling',
    name: 'Bling ERP',
    description: 'Complete ERP system with 123 tools for business management',
    logoUrl: 'https://www.bling.com.br/favicon.ico',
    category: 'ERP',
    enabled: true,
  },
  {
    id: 'zapi',
    name: 'Z-API WhatsApp',
    description: 'WhatsApp Business API with 74 tools for messaging automation',
    logoUrl: 'https://www.z-api.io/favicon.ico',
    category: 'Communication',
    enabled: true,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open source Firebase alternative - 62 tools for backend services',
    logoUrl: 'https://supabase.com/favicon/favicon.ico',
    category: 'Backend',
    enabled: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Instagram Business API with 50 tools for social media management',
    logoUrl: 'https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico',
    category: 'Social Media',
    enabled: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Facebook Graph API with 40 tools for pages and ads management',
    logoUrl: 'https://www.facebook.com/favicon.ico',
    category: 'Social Media',
    enabled: true,
  },
  {
    id: 'godaddy',
    name: 'GoDaddy',
    description: 'Domain management with 35 tools for DNS and hosting',
    logoUrl: 'https://www.godaddy.com/favicon.ico',
    category: 'Domain',
    enabled: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Version control with 22 tools for repository management',
    logoUrl: 'https://github.githubassets.com/favicons/favicon.svg',
    category: 'Development',
    enabled: true,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deployment platform with 31 tools for hosting and CI/CD',
    logoUrl: 'https://vercel.com/favicon.ico',
    category: 'Hosting',
    enabled: true,
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Workflow automation with 45 tools for process automation',
    logoUrl: 'https://n8n.io/favicon.ico',
    category: 'Automation',
    enabled: true,
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Visual automation platform with 38 tools',
    logoUrl: 'https://www.make.com/favicon.ico',
    category: 'Automation',
    enabled: true,
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    description: 'Cloud infrastructure with 28 tools for server management',
    logoUrl: 'https://www.hetzner.com/favicon.ico',
    category: 'Infrastructure',
    enabled: true,
  },
  {
    id: 'portainer',
    name: 'Portainer',
    description: 'Container management with 24 tools for Docker/Kubernetes',
    logoUrl: 'https://www.portainer.io/favicon.ico',
    category: 'Infrastructure',
    enabled: true,
  },
  {
    id: 'chatwoot',
    name: 'Chatwoot',
    description: 'Customer support platform with 19 tools',
    logoUrl: 'https://www.chatwoot.com/favicon.ico',
    category: 'Support',
    enabled: true,
  },
  {
    id: 'mercadolivre',
    name: 'Mercado Livre',
    description: 'E-commerce marketplace with 42 tools for selling online',
    logoUrl: 'https://http2.mlstatic.com/favicon.ico',
    category: 'E-commerce',
    enabled: true,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<App[] | { error: string }>
) {
  if (req.method === 'GET') {
    // In a real implementation, this would fetch from your MCP server
    res.status(200).json(mockApps);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}