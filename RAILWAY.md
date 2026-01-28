# Frontend RSVP - Gustavo's 30th Birthday

Aplicação frontend para RSVP do evento de aniversário de Gustavo.

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Acesso: http://localhost:8080

## Build para Produção

```bash
npm run build
```

## Deploy no Railway

### Opção 1: Via GitHub

1. Faça push do repositório para GitHub
2. Entre no Railway e clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Escolha o repositório `gustavo-s-30th-weekend`
5. Configure as variáveis de ambiente

### Opção 2: Via Railway CLI

```bash
npm install -g @railway/cli
railway link
railway up
```

## Variáveis de Ambiente

### Desenvolvimento (`.env.development`)
```
VITE_API_URL=http://localhost:3001/api
```

### Produção (`.env.production`)
```
VITE_API_URL=http://backend-rsvp.railway.internal:3001/api
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (Vite)
- `npm run build` - Build para produção
- `npm start` - Inicia servidor Express com arquivos compilados
- `npm run serve` - Build + start (usado no Railway)
- `npm run preview` - Preview do build
- `npm test` - Executar testes
- `npm run lint` - Executar linter

## Estrutura do Projeto

```
src/
├── App.tsx           # Componente principal
├── components/       # Componentes React
├── pages/           # Páginas da aplicação
├── assets/          # Imagens e recursos estáticos
└── styles/          # Estilos globais
```

## Tecnologias

- React 18.3 com TypeScript
- Vite 5.4 (Build tool)
- Tailwind CSS 3.4
- shadcn/ui (Componentes UI)
- Framer Motion (Animações)
- React Router (Navegação)
- Express (Servidor de produção)

## API Integration

A aplicação se conecta ao backend em `http://backend-rsvp.railway.internal:3001/api` em produção.

### Endpoints Utilizados

- `POST /guests` - Criar novo RSVP
- `GET /guests` - Listar confirmações
- `GET /guests/:id` - Obter detalhes do convidado
- `PUT /guests/:id` - Atualizar confirmação
- `DELETE /guests/:id` - Remover confirmação

## Health Check

O servidor Express expõe um endpoint de health check em `/health` para monitoramento.

## Notas Importantes

1. O arquivo `server.js` é usado para servir a aplicação em produção
2. O build do Vite gera os arquivos em `dist/`
3. O Express redireciona todas as rotas para `index.html` para suportar SPA routing
4. Cors é configurado para permitir requisições do backend

## Troubleshooting

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Variáveis de ambiente não carregando
Certifique-se que os arquivos `.env.*` estão na raiz do projeto e que o comando está usando o modo correto:
- Desenvolvimento: `npm run dev` (carrega `.env.development`)
- Build: `npm run build` (não carrega vars de env, use em produção)
- Produção: Railway injeta variáveis automaticamente
