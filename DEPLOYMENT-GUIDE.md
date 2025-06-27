# 🚀 MCP Panel - Guia de Deploy Completo

## Projeto Criado!

Um painel completo em React/Next.js com Tailwind CSS para gerenciar suas integrações MCP.

### ✅ Funcionalidades Implementadas

1. **Dashboard Principal** (`pages/index.tsx`)
   - Lista todos os apps disponíveis
   - Busca e filtro por categoria
   - Cards com logo, nome e descrição
   - Estatísticas gerais

2. **Página de Detalhes do App** (`pages/app/[appId].tsx`)
   - Lista todas as tools/endpoints
   - Filtro por método HTTP
   - Botão "Testar" para cada tool

3. **Executor de Tools** (`pages/app/[appId]/tool/[toolId].tsx`)
   - Editor JSON para input
   - Execução da tool com loading state
   - Visualização da resposta
   - **SSE em tempo real** para logs

4. **UI Moderna e Responsiva**
   - Tailwind CSS com tema customizado
   - Dark mode completo
   - Animações e transições suaves
   - Layout responsivo

## 📦 Estrutura do Projeto

```
mcp-panel/
├── pages/
│   ├── index.tsx              # Dashboard
│   ├── app/
│   │   ├── [appId].tsx       # Tools do app
│   │   └── [appId]/
│   │       └── tool/
│   │           └── [toolId].tsx  # Executor
│   ├── docs.tsx              # Documentação
│   └── api/
│       ├── apps/             # Mock API
│       └── mcp/[...path].ts # Proxy MCP
├── components/
│   ├── Layout.tsx            # Layout principal
│   ├── AppCard.tsx          # Card de app
│   ├── LoadingSpinner.tsx  # Loading
│   └── JsonViewer.tsx       # Visualizador JSON
├── hooks/
│   └── useSSE.ts            # Hook para SSE
├── lib/
│   └── api.ts               # Cliente API
└── styles/
    └── globals.css          # Estilos globais
```

## 🚀 Deploy na Vercel

### Opção 1: Deploy Automático (Recomendado)

1. **Faça commit do projeto:**
```bash
cd mcp-panel
git init
git add .
git commit -m "Initial MCP Panel"
git remote add origin https://github.com/SEU-USUARIO/mcp-panel.git
git push -u origin main
```

2. **Deploy na Vercel:**
- Acesse [vercel.com](https://vercel.com)
- Clique em "Import Project"
- Conecte seu GitHub e selecione o repositório
- Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
cd mcp-panel
npm install
npx vercel
```

## 🌐 Configurar Domínio (mcp.plataforma.app)

### 1. Na Vercel:
1. Vá para Project Settings > Domains
2. Adicione: `mcp.plataforma.app`
3. Copie os valores de DNS fornecidos

### 2. No GoDaddy:
1. Acesse seu painel GoDaddy
2. Vá para DNS Management do domínio `plataforma.app`
3. Adicione um registro:
   - **Type**: A
   - **Name**: mcp
   - **Value**: 76.76.21.21
   - **TTL**: 600

OU use CNAME:
   - **Type**: CNAME
   - **Name**: mcp
   - **Value**: cname.vercel-dns.com
   - **TTL**: 600

## 🔧 Configuração de Ambiente

Crie `.env.local` na Vercel ou localmente:

```env
NEXT_PUBLIC_API_URL=https://mcp-integrations-server.vercel.app
```

## 🎯 Integração com seu MCP Server

O painel está configurado para se conectar ao seu servidor em:
`https://mcp-integrations-server.vercel.app`

Para funcionar completamente, seu servidor MCP precisa implementar:

1. **GET /apps** - Retornar lista de apps
2. **GET /apps/:appId/tools** - Retornar tools do app
3. **POST /apps/:appId/tools/:toolId/execute** - Executar tool
4. **GET /apps/:appId/tools/:toolId/stream** - SSE para logs

## 📝 Próximos Passos

1. **Deploy o Painel:**
   ```bash
   cd mcp-panel
   ./deploy.sh
   ```

2. **Configure o Domínio:**
   - Adicione `mcp.plataforma.app` na Vercel
   - Configure DNS no GoDaddy

3. **Atualize seu MCP Server:**
   - Implemente os endpoints necessários
   - Adicione CORS headers se necessário

4. **Personalize:**
   - Adicione logos reais dos apps
   - Customize cores e tema
   - Adicione mais funcionalidades

## 🎨 Customização

### Cores do Tema
Edite `tailwind.config.js`:
```js
colors: {
  'mcp-primary': '#8B5CF6',    // Roxo
  'mcp-secondary': '#EC4899',   // Rosa
  'mcp-dark': '#1F2937',       // Cinza escuro
  'mcp-darker': '#111827',     // Preto
}
```

### Adicionar Novos Apps
Edite `pages/api/apps/index.ts` ou implemente no servidor real.

## 🚨 Importante

- O SSE está configurado usando `@microsoft/fetch-event-source` para compatibilidade com Vercel
- O proxy MCP em `/api/mcp/[...path]` encaminha requests para o servidor
- Dark mode é detectado automaticamente
- Todas as páginas são responsivas

## ✅ Tudo Pronto!

Seu painel MCP está completo e pronto para deploy. Após configurar o domínio, ele estará disponível em:

**https://mcp.plataforma.app**

Aproveite seu novo painel de integração MCP! 🎉