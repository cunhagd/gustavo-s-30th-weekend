# 🚀 Variáveis de Ambiente - Frontend Railway

## ✅ Variáveis Obrigatórias para Railway

### 1. **VITE_API_URL** (Crítica ⭐)
```
https://backend-rsvp-production-67d8.up.railway.app/api
```
- **O que é**: URL da API do backend em produção
- **Por que**: O React precisa saber para onde fazer requisições RSVP
- **Obrigatória**: SIM - sem isso o modal RSVP não funciona

### 2. **PORT** (Crítica ⭐)
```
3000
```
- **O que é**: Porta que o Express server vai rodar
- **Por que**: Railway precisa saber qual porta expor
- **Padrão**: 3000 (recomendado)
- **Obrigatória**: SIM

### 3. **NODE_ENV** (Recomendado)
```
production
```
- **O que é**: Ambiente de execução
- **Por que**: Otimiza performance e desabilita warnings de desenvolvimento
- **Obrigatória**: NÃO (mas altamente recomendado)

---

## 📋 Passo a Passo para Adicionar no Railway

### 1. Acesse o Dashboard do Railway
```
https://railway.app/dashboard
```

### 2. Selecione seu Projeto (Frontend)
```
gustavo-s-30th-weekend
```

### 3. Clique em "Variables"
Veja a aba de variáveis de ambiente

### 4. Adicione Cada Variável

**Variável 1:**
- Key: `VITE_API_URL`
- Value: `https://backend-rsvp-production-67d8.up.railway.app/api`

**Variável 2:**
- Key: `PORT`
- Value: `3000`

**Variável 3:**
- Key: `NODE_ENV`
- Value: `production`

### 5. Clique em "Deploy" ou "Redeploy"
Railway fará novo deploy com as variáveis

---

## 🔍 Verificar Se Está Funcionando

Após o deploy, teste:

```bash
# 1. Health check (sem API)
curl https://seu-frontend.up.railway.app/health

# Esperado:
# {"status":"ok","timestamp":"2026-01-27T..."}

# 2. Abra no navegador
https://seu-frontend.up.railway.app

# 3. Teste o RSVP Modal
- Clique em "RSVP"
- Preencha o formulário
- Verifique se envia para a API
```

---

## 📊 Resumo de Variáveis

| Variável | Valor | Obrigatória | Nota |
|----------|-------|------------|------|
| `VITE_API_URL` | `https://backend-rsvp-production-67d8.up.railway.app/api` | ✅ SIM | API endpoint |
| `PORT` | `3000` | ✅ SIM | Porta Express |
| `NODE_ENV` | `production` | ⭐ Recomendado | Otimiza build |

---

## 🎯 O que Cada Variável Faz

### `VITE_API_URL`
- **Build Time**: Vite compila isso no JavaScript final
- **Runtime**: React usa para fazer fetch() nas requisições RSVP
- **Sem isso**: Modal RSVP dará erro ao tentar enviar dados
- **Exemplo de erro**: `Cannot POST https://undefined/api/guests`

### `PORT`
- **Build Time**: Não afeta build
- **Runtime**: Express server escuta nessa porta
- **Sem isso**: Railway não sabe qual porta expor publicamente
- **Fallback**: Código tenta porta 3000 se não definida

### `NODE_ENV`
- **Build Time**: Vite otimiza para produção (remove warnings)
- **Runtime**: Desabilita debug mode do React
- **Sem isso**: Funciona, mas com mais overhead
- **Recomendado**: Sempre usar em produção

---

## 🚀 Fluxo Completo

```
1. Você adiciona VITE_API_URL no Railway Dashboard
   ↓
2. Railway clona o GitHub repo
   ↓
3. npm install
   ↓
4. npm run build (Vite compila com VITE_API_URL)
   ↓
5. npm start (Express server inicia na PORT 3000)
   ↓
6. Frontend rodando em https://seu-frontend.up.railway.app
   ↓
7. React load, lê VITE_API_URL compilada
   ↓
8. Usuário clica RSVP → envia para backend
   ↓
9. Backend responde com dados salvos em PostgreSQL
   ↓
10. RSVP confirmado! 🎉
```

---

## ⚠️ Erros Comuns

### Erro 1: "VITE_API_URL is undefined"
**Solução**: Adicione a variável no Railway e faça redeploy

### Erro 2: "Cannot fetch from API"
**Possibilidades**:
- VITE_API_URL errada
- Backend não está respondendo
- CORS não configurado no backend

**Teste**: Abra console do navegador (F12) e veja erro exato

### Erro 3: "Port 3000 already in use"
**Solução**: Railway gerencia portas automaticamente, não é problema

---

## 📝 Arquivo .env.railway (Apenas Referência)

Este arquivo já está no GitHub com os valores corretos:

```env
VITE_API_URL=https://backend-rsvp-production-67d8.up.railway.app/api
PORT=3000
NODE_ENV=production
```

✅ Já está commitado, não precisa copiar manualmente

---

## 🔗 Links Úteis

- [Railway Docs - Variables](https://docs.railway.app/guides/variables)
- [Vite Docs - Environment Variables](https://vitejs.dev/guide/env-and-modes)
- [Express Docs - Environment Variables](https://expressjs.com/en/api/process.html#process.env)

---

## ✅ Checklist de Deploy

- [ ] Frontend repository no GitHub
- [ ] Conectado ao Railway
- [ ] Variáveis adicionadas no Railway:
  - [ ] VITE_API_URL
  - [ ] PORT
  - [ ] NODE_ENV
- [ ] Deploy iniciado
- [ ] Health check respondendo (`/health`)
- [ ] RSVP modal funcionando
- [ ] Dados aparecendo no backend

---

**Pronto! Assim que adicionar essas 3 variáveis no Railway e fazer deploy, o frontend estará 100% funcional!** 🚀
