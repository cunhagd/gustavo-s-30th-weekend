# 🚀 Deploy Frontend no Railway - Guia Rápido

## Tudo está pronto! Siga 5 passos:

### 1️⃣ Acesse Railway
```
https://railway.app/dashboard
```

### 2️⃣ Clique em "New Project"
→ "Deploy from GitHub"

### 3️⃣ Selecione o repositório
→ `cunhagd/gustavo-s-30th-weekend`

### 4️⃣ Configure Variáveis de Ambiente
No painel do Railway, adicione:

```env
VITE_API_URL=http://backend-rsvp.railway.internal:3001/api
PORT=3000
NODE_ENV=production
```

### 5️⃣ Clique em "Deploy"
Railway fará o resto automaticamente! 🎉

---

## ✅ Arquivos Já Criados

- ✅ `server.js` - Express server
- ✅ `Procfile` - Comando de inicialização
- ✅ `package.json` - Scripts atualizados
- ✅ `.env.railway` - Variáveis
- ✅ Tudo commitado no GitHub

---

## 📖 Documentações Detalhadas

Para informações mais completas, consulte:

1. **DEPLOY_RAILWAY.md** - Guia completo passo a passo
2. **RAILWAY_READY.md** - Checklist de pronta entrega
3. **STATUS_FINAL.md** - Status completo do projeto
4. **RAILWAY.md** - Documentação técnica

---

## 🧪 Testar Localmente (Opcional)

```bash
npm run build
npm start
```

Acesse: http://localhost:3000

---

## 🎯 O que Acontece no Deploy

1. Railway clona o repositório
2. Executa `npm install`
3. Executa `npm run build` (compila Vite)
4. Inicia `npm start` (Express server)
5. Arquivos estáticos servidos do `dist/`
6. React funciona normalmente
7. API conecta ao backend via `railway.internal`

---

## 📞 Ajuda

- **Build falha?** Verifique `DEPLOY_RAILWAY.md`
- **Variáveis de ambiente?** Leia `RAILWAY_READY.md`
- **Arquitetura?** Consulte `STATUS_FINAL.md`

---

**Tempo total de deploy: 5-10 minutos**

Boa sorte! 🎉
