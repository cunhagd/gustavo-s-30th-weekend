# Configuração de Ambientes

## Frontend (gustavo-s-30th-weekend)

### Desenvolvimento
```bash
npm run dev
# Usa: .env.development
# API: http://localhost:3001/api
```

### Produção (Vercel)
```bash
npm run build
# Usa: .env.production
# API: http://backend-rsvp.railway.internal:3001/api
```

### Arquivos:
- `.env.development` - Desenvolvimento local
- `.env.production` - Produção (Railway)
- `.env.example` - Template

---

## Backend (backend-rsvp)

### Desenvolvimento
```bash
npm run dev
# Usa: .env
# PORT: 3001
# DATABASE: PostgreSQL Railway
# CORS: http://localhost:8080
```

### Produção (Railway)
```bash
npm run build
npm start
# Usa: .env.production
# PORT: 3001 (Railway define automaticamente)
# DATABASE: PostgreSQL Railway
# CORS: https://gustavo30thweekend.vercel.app
```

### Arquivos:
- `.env` - Desenvolvimento
- `.env.production` - Produção
- `.env.example` - Template

---

## Variáveis de Ambiente

### Frontend

**Development (.env.development):**
```
VITE_API_URL=http://localhost:3001/api
```

**Production (.env.production):**
```
VITE_API_URL=http://backend-rsvp.railway.internal:3001/api
```

### Backend

**Development (.env):**
```
PORT=3001
DATABASE_URL=postgresql://postgres:dfUQbXylyHePccpwqesqvQbaLTAFKTee@hopper.proxy.rlwy.net:54331/railway
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```

**Production (.env.production):**
```
PORT=3001
DATABASE_URL=postgresql://postgres:dfUQbXylyHePccpwqesqvQbaLTAFKTee@hopper.proxy.rlwy.net:54331/railway
NODE_ENV=production
CORS_ORIGIN=https://gustavo30thweekend.vercel.app
```

---

## Deploy no Railway

### Backend
1. Conectar repositório GitHub
2. Selecionar branch `main`
3. Railway detecta Node.js automaticamente
4. Variáveis de ambiente serão configuradas no painel do Railway
5. Deploy automático a cada push

### Frontend (Vercel)
1. Importar projeto do GitHub
2. Selecionar branch `main`
3. Adicionar variável: `VITE_API_URL=http://backend-rsvp.railway.internal:3001/api`
4. Deploy automático

---

## Checklist de Configuração

✅ Frontend - .env.development configurado
✅ Frontend - .env.production configurado
✅ Backend - .env configurado
✅ Backend - .env.production configurado
✅ Backend - Subido no Railway
✅ Banco de dados PostgreSQL - Criado
✅ Tabelas - Migradas com sucesso
✅ CORS - Configurado para ambos os ambientes
✅ Git - Sincronizado

