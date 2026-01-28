# 🚀 Guia de Testes - Frontend em Produção (Railway)

**Data**: 28 de janeiro de 2026  
**Objetivo**: Validar que o frontend está 100% funcional em produção

---

## 📋 Pré-requisitos

- Frontend deployado no Railway
- Backend rodando em `https://backend-rsvp-production-67d8.up.railway.app`
- URL do frontend: `https://seu-frontend.up.railway.app`

> Substitua `seu-frontend` pelo nome real do seu projeto no Railway

---

## 🧪 Testes Sequenciais (Passo a Passo)

### 1️⃣ TESTE DE ACESSO BÁSICO

**O que testar**: Se o frontend está acessível

```bash
# Terminal / PowerShell
curl https://seu-frontend.up.railway.app

# Ou abra no navegador
https://seu-frontend.up.railway.app
```

**Esperado**:
- ✅ Página carrega sem erros 404
- ✅ HTML com React app é retornado
- ✅ Sem erros no console do navegador (F12)

---

### 2️⃣ TESTE DE HEALTH CHECK

**O que testar**: Se o Express server está respondendo

```bash
# Terminal
curl https://seu-frontend.up.railway.app/health

# Esperado:
# {"status":"ok","timestamp":"2026-01-28T..."}
```

**No navegador**:
```
https://seu-frontend.up.railway.app/health
```

**Status esperado**: 
- ✅ Status: `ok`
- ✅ Timestamp: presente e recente
- ✅ Response Code: 200

---

### 3️⃣ TESTE DA PÁGINA PRINCIPAL

**O que testar**: Se o React está carregando corretamente

**Passos**:
1. Abra: `https://seu-frontend.up.railway.app`
2. Aguarde a página carregar completamente
3. Veja se os elementos aparecem:

**Checklist Visual**:
- [ ] Header/Navbar com logo visível
- [ ] Hero section com imagem de fundo
- [ ] Seção "Conceito" com texto
- [ ] Seção "Galeria" com carousels
- [ ] Seção "Gastronomia" com menu
- [ ] Seção "Local" com mapa
- [ ] Botão "RSVP" visível

**Console do Navegador (F12)**:
- [ ] Sem erros vermelhos
- [ ] Sem warnings críticos
- [ ] Sem mensagens de `undefined` URLs

---

### 4️⃣ TESTE DO RSVP MODAL

**O que testar**: Se o formulário RSVP funciona

**Passos**:

1. Clique no botão "RSVP"
2. Modal deve abrir
3. Preencha o formulário:
   - Nome: "João Silva"
   - Idade: "30"
   - Tem filhos: "Não" (primeiro teste)
   - Dia de chegada: Selecione uma data

**Checklist**:
- [ ] Modal abre sem erros
- [ ] Campos aceitam texto
- [ ] Validação de campo funciona
- [ ] Botão de envio está habilitado

---

### 5️⃣ TESTE DE ENVIO DO RSVP

**O que testar**: Se o frontend consegue enviar dados para o backend

**Passos**:

1. Preencha o formulário RSVP completamente
2. Clique em "Confirmar"
3. Aguarde resposta

**Console do Navegador (F12 → Network)**:

Procure por uma requisição `POST` para:
```
https://backend-rsvp-production-67d8.up.railway.app/api/guests
```

**Checklist**:
- [ ] Requisição é feita (status 200 ou 201)
- [ ] Resposta contém `id` do convidado
- [ ] Sem erro CORS
- [ ] Sem erro de timeout

**Resposta Esperada**:
```json
{
  "id": 1,
  "name": "João Silva",
  "age": 30,
  "has_children": false,
  "will_stay": false,
  "arrival_day": "saturday",
  "confirmed_at": "2026-01-28T...",
  "updated_at": "2026-01-28T..."
}
```

---

### 6️⃣ TESTE COM FILHOS

**O que testar**: Formulário com filhos

**Passos**:

1. Clique RSVP novamente
2. Marque "Tem filhos: Sim"
3. Adicione 2 filhos:
   - Filho 1: Nome "Ana", Idade "8"
   - Filho 2: Nome "Bruno", Idade "5"
4. Selecione dias de chegada
5. Envie

**Checklist**:
- [ ] Campos de filho aparecem dinamicamente
- [ ] Pode adicionar múltiplos filhos
- [ ] Dados são validados corretamente
- [ ] Requisição inclui dados dos filhos

---

### 7️⃣ TESTE DE CARREGAMENTO DE IMAGENS

**O que testar**: Se as 47 imagens da galeria carregam

**Passos**:

1. Vá para seção "Galeria"
2. Clique nos 3 carousels:
   - Quartos (16 fotos)
   - Sala de Estar (4 fotos)
   - Área Externa (27 fotos)

**Checklist**:
- [ ] Todas as imagens carregam
- [ ] Sem "imagem quebrada" (ícone X)
- [ ] Navegação do carousel funciona
- [ ] Imagens em diferentes formatos (AVIF, JPEG, PNG, WebP)

**Console (F12 → Network)**:
- [ ] Nenhuma requisição 404 de imagem
- [ ] Tamanho das imagens é razoável

---

### 8️⃣ TESTE DE RESPONSIVIDADE

**O que testar**: Se funciona em diferentes tamanhos

**Desktop** (1920x1080):
- [ ] Layout completo
- [ ] Todos elementos visíveis
- [ ] Sem overflow

**Tablet** (768x1024):
- [ ] Menu responsivo (F12 → Device Toggle)
- [ ] Carousels funcionam
- [ ] Texto legível

**Mobile** (375x667):
- [ ] Menu sanduíche funciona
- [ ] Touch scroll funcionando
- [ ] Botões clicáveis
- [ ] RSVP modal responsivo

---

### 9️⃣ TESTE DE NAVEGAÇÃO

**O que testar**: Se todos os links funcionam

**Navbar**:
- [ ] Clique "Início" → volta ao topo
- [ ] Clique "Conceito" → scroll para conceito
- [ ] Clique "Local" → scroll para mapa
- [ ] Clique "Galeria" → scroll para fotos
- [ ] Clique "Programação" → scroll para programação
- [ ] Clique "Menu" → scroll para gastronomia
- [ ] Clique "Como Chegar" → scroll para local
- [ ] Clique "RSVP" → abre modal

---

## 🔍 TESTES AVANÇADOS

### 10️⃣ TESTE DE PERFORMANCE

**Velocidade de Carregamento**:
1. Abra DevTools (F12)
2. Vá em "Performance" ou "Lighthouse"
3. Clique "Analyze page load"

**Targets**:
- ⏱️ First Contentful Paint: < 2s
- ⏱️ Largest Contentful Paint: < 3s
- ⏱️ Cumulative Layout Shift: < 0.1
- ⏱️ Time to Interactive: < 4s

---

### 1️⃣1️⃣ TESTE DE ERROS DO CONSOLE

**O que verificar**:

Abra Console (F12) e veja:
- [ ] Sem erros vermelhos
- [ ] Sem warnings críticos
- [ ] `VITE_API_URL` carregada corretamente

**Para checar a URL da API**:
```javascript
// Digite no console do navegador
console.log(import.meta.env.VITE_API_URL)

// Esperado: https://backend-rsvp-production-67d8.up.railway.app/api
```

---

### 1️⃣2️⃣ TESTE DE MÚLTIPLAS RESPOSTAS

**O que testar**: Enviar RSVP múltiplas vezes

1. Abra o RSVP Modal
2. Envie um formulário (vai dar erro se nome já existe)
3. Verifique se a API retorna erro correto

**Esperado**:
- Primeira vez: Sucesso ✅
- Segunda vez (mesmo nome): Erro UNIQUE constraint ❌

---

## 📊 VERIFICAÇÃO EM PRODUÇÃO

### Logs do Railway

1. Acesse: **https://railway.app/dashboard**
2. Selecione: **gustavo-s-30th-weekend**
3. Clique: **Logs**
4. Veja logs em tempo real:

```
2026-01-28T10:30:45.123Z - GET /health
2026-01-28T10:30:46.456Z - GET /api/guests (backend)
2026-01-28T10:30:47.789Z - POST /api/guests (backend)
```

**Checklist**:
- [ ] Health check requests chegando
- [ ] Requisições POST para backend
- [ ] Sem erros 500
- [ ] Latência < 500ms

---

## ✅ CHECKLIST FINAL DE TESTES

### Funcionalidade
- [ ] Frontend carrega sem 404
- [ ] Health check responde
- [ ] RSVP modal abre
- [ ] Formulário valida dados
- [ ] Envio de RSVP funciona
- [ ] Backend recebe dados
- [ ] Imagens carregam todas

### Performance
- [ ] Carregamento < 3s
- [ ] Sem console errors
- [ ] Responsivo em mobile
- [ ] Scroll suave

### Integração
- [ ] API URL correta
- [ ] CORS funcionando
- [ ] Backend responde
- [ ] Dados salvos em PostgreSQL

### Produção
- [ ] URL pública acessível
- [ ] SSL/HTTPS funcionando
- [ ] Logs aparecem no Railway
- [ ] Sem erros de timeout

---

## 🐛 TROUBLESHOOTING

### Se receber erro 404
**Solução**: Verifique se o Railway finalizou o deploy
1. Dashboard do Railway
2. Clique no projeto
3. Veja status em "Deployments"

### Se RSVP não enviar
**Solução**: Verifique CORS
1. Console (F12)
2. Network tab
3. Veja resposta do POST
4. Procure por "CORS" no erro

### Se imagens não carregarem
**Solução**: Verifique build
1. `npm run build` localmente
2. Verifique se `dist/` tem as imagens
3. Faça redeploy no Railway

### Se velocidade lenta
**Solução**: Otimize chunks
1. Edite `vite.config.ts`
2. Configure `manualChunks`
3. Faça novo build
4. Push para GitHub

---

## 📞 VALIDAÇÃO FINAL

Quando todo o checklist passar:

```
✅ Frontend: ONLINE E FUNCIONAL
✅ Backend: CONECTADO E RESPONDENDO
✅ Database: RECEBENDO DADOS
✅ API: 100% FUNCIONAL
✅ RSVP: SISTEMA PRONTO PARA CONVIDADOS

🎉 SISTEMA PRONTO PARA PRODUÇÃO!
```

---

## 🔗 URLs DE REFERÊNCIA

- **Frontend**: `https://seu-frontend.up.railway.app`
- **Health Check**: `https://seu-frontend.up.railway.app/health`
- **Backend API**: `https://backend-rsvp-production-67d8.up.railway.app/api`
- **Railway Dashboard**: `https://railway.app/dashboard`

---

## 📝 Anotações

Use este espaço para registrar resultados dos testes:

```
Data: 28/01/2026
Frontend URL: https://...
Status: [ ] OK / [ ] COM PROBLEMAS
Detalhes: ...

Teste RSVP: [ ] OK / [ ] COM PROBLEMAS
Resposta: ...

Notas: ...
```

---

**Bom teste! 🎉 Se alguma coisa não funcionar, consulte os logs do Railway ou a documentação específica de cada erro.**
