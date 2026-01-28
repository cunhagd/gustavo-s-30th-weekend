# Guia de Deploy no Railway - Frontend e Backend

## 📋 Pré-requisitos

- Conta no [Railway.app](https://railway.app)
- Repositórios GitHub com os códigos (já feito ✅)
- Node.js instalado localmente (para testes)

---

## 🚀 Deploy do Backend (já em produção ✅)

O backend já está deployado no Railway. Para verificar:

1. Acesse: https://railway.app
2. Projeto: `backend-rsvp`
3. Ambiente: `production`
4. URL interna: `http://backend-rsvp.railway.internal:3001/api`
5. Health check: `http://backend-rsvp.railway.internal:3001/health`

### Variáveis de Ambiente (Backend)

```env
DATABASE_URL=postgresql://postgres:dfUQbXylyHePccpwqesqvQbaLTAFKTee@hopper.proxy.rlwy.net:54331/railway
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://seu-dominio.railway.app
```

---

## 🎨 Deploy do Frontend no Railway

### Passo 1: Conectar GitHub no Railway

1. Acesse https://railway.app/dashboard
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub"**
4. Autorize sua conta GitHub
5. Selecione o repositório: **`gustavo-s-30th-weekend`**

### Passo 2: Configurar Variáveis de Ambiente

No painel do Railway, acesse **Variables** e adicione:

```env
VITE_API_URL=http://backend-rsvp.railway.internal:3001/api
PORT=3000
NODE_ENV=production
```

### Passo 3: Configurar Build e Deploy

Na seção **Settings** do projeto:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

Ou deixe em branco (Railway detectará automaticamente via `Procfile`)

### Passo 4: Deploy

1. Clique em **"Deploy"** ou aguarde o deploy automático via GitHub
2. Railway fará:
   - Clone do repositório
   - `npm install`
   - `npm run build` (compila React/TypeScript)
   - `npm start` (inicia Express server)

### Passo 5: Obter URL Pública

Após o deploy bem-sucedido:

1. Vá para a guia **"Deployments"**
2. Clique no deployment ativo
3. Copie a URL pública (ex: `https://gustavo-s-30th-weekend.up.railway.app`)
4. Acesse para verificar se está funcionando

---

## 🔄 Processo de Deploy Automático

Após a configuração inicial:

1. **Qualquer push para `main`** dispara deployment automático
2. **Rollback automático** se o build falhar
3. Monitore em **"Deployments"** no painel do Railway

### Fluxo Local → GitHub → Railway

```
git add .
git commit -m "sua mensagem"
git push origin main
    ↓
GitHub recebe o push
    ↓
Railroad webhook dispara
    ↓
Railway clona o repo
    ↓
npm install && npm run build
    ↓
npm start (server.js)
    ↓
App rodando em https://seu-dominio.railway.app
```

---

## 📊 Estrutura de Arquivos Importantes

### Frontend (`c:\gustavo-s-30th-weekend`)

```
.
├── server.js              ← Express server para produção
├── package.json          ← Scripts: start, serve, build
├── Procfile              ← Comando de inicialização (Railway)
├── .env.railway          ← Variáveis para Railway
├── railway.json          ← Config schema
├── .railwayignore        ← Arquivos ignorados pelo Railway
├── vite.config.ts        ← Config do Vite
├── src/
│   ├── components/
│   │   └── modals/RSVPModal.tsx
│   ├── App.tsx
│   └── main.tsx
└── dist/                 ← Build output (gerado por npm run build)
```

### Backend (`c:\backend-rsvp`)

```
.
├── src/
│   ├── index.ts          ← Express server
│   ├── database.ts       ← Connection pool PostgreSQL
│   ├── routes/
│   │   └── guests.ts
│   └── migrations/
│       └── 001_create_tables.ts
├── package.json
├── .env.production
└── tsconfig.json
```

---

## 🧪 Testes Locais Antes de Deploy

### 1. Build Local

```bash
cd c:\gustavo-s-30th-weekend
npm run build
```

Verifique se a pasta `dist/` foi criada com arquivos.

### 2. Testar Server Local

```bash
npm start
```

Acesse: http://localhost:3000

### 3. Testar com Variáveis de Produção

```bash
set VITE_API_URL=http://localhost:3001/api
npm start
```

---

## 🔍 Monitoramento no Railway

### Logs do Frontend

1. Vá para o projeto no Railway
2. Clique em **"Logs"**
3. Veja logs em tempo real

### Health Check

```bash
# Test health endpoint do backend
curl http://backend-rsvp.railway.internal:3001/health

# Test health do frontend (após deploy)
curl https://seu-dominio.railway.app/health
```

---

## 🐛 Troubleshooting

### Erro: "npm: command not found"

Railway precisa de `node_modules`. Certifique-se que:
1. `package.json` e `package-lock.json` estão commitados
2. `.npmrc` não está em `.gitignore`

### Erro: "VITE_API_URL is undefined"

1. Verifique se `.env.railway` está commitado
2. Adicione variável manualmente em Railway → Variables
3. Re-deploy

### Build falha

1. Verifique logs em Railway → Logs
2. Teste localmente: `npm run build`
3. Verifique se TypeScript compila: `npx tsc --noEmit`

### Conexão Backend Falha

1. Verifique se backend está rodando: `curl http://backend-rsvp.railway.internal:3001/health`
2. Confira `VITE_API_URL` em production
3. Verifique CORS no backend

---

## 📝 Checklist de Deploy

- [ ] Backend deployado e rodando ✅
- [ ] Frontend repositório no GitHub ✅
- [ ] Railway account criada
- [ ] GitHub conectado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Build testado localmente (`npm run build`)
- [ ] Deploy automático configurado
- [ ] URL pública testada
- [ ] RSVP modal funcionando
- [ ] API integrada com sucesso
- [ ] Health checks respondendo

---

## 📞 Comandos Úteis

```bash
# Local - Desenvolvimento
cd c:\gustavo-s-30th-weekend
npm run dev

# Local - Build + Test produção
npm run build
npm start

# GitHub - Push changes
git add .
git commit -m "mensagem"
git push origin main

# Railway CLI (alternativa)
npm install -g @railway/cli
railway link
railway up
```

---

## 🎯 URLs Finais

- **Frontend**: `https://seu-dominio.railway.app`
- **Backend API**: `http://backend-rsvp.railway.internal:3001/api`
- **Backend Health**: `http://backend-rsvp.railway.internal:3001/health`
- **Frontend Health**: `https://seu-dominio.railway.app/health`

---

## 📚 Referências

- [Railway Docs](https://docs.railway.app)
- [Railway Node.js Guide](https://docs.railway.app/guides/nodejs)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Express Static Files](https://expressjs.com/en/starter/static-files.html)

---

**Última atualização**: 27/01/2026

**Status**: ✅ Backend em produção | ⏳ Frontend pronto para deploy
