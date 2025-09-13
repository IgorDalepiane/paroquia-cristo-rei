# Configuração Cloudflare Pages - Paróquia Cristo Rei

## 📋 Checklist de Configuração

### 1. Preparação do Repositório GitHub ✅
- [x] Projeto Next.js criado
- [x] Página "em breve" implementada
- [x] Configurações de build otimizadas
- [ ] Commit inicial feito
- [ ] Push para GitHub realizado

### 2. Configuração Cloudflare Pages

#### 2.1 Criar Projeto
1. Acesse: https://dash.cloudflare.com
2. Vá para "Pages" → "Create a project"
3. Selecione "Connect to Git"
4. Autorize acesso ao GitHub
5. Selecione repositório: `paroquia-cristo-rei`

#### 2.2 Configurações de Build
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: /
Node.js version: 18.x
```

#### 2.3 Variáveis de Ambiente
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://paroquiacristorei.org
```

### 3. Configuração de Domínio

#### 3.1 Adicionar Domínio Personalizado
1. No projeto Pages → "Custom domains"
2. Clique "Set up a custom domain"
3. Digite: `paroquiacristorei.org`
4. Adicione também: `www.paroquiacristorei.org`

#### 3.2 Configuração DNS
Adicione os seguintes registros DNS no seu provedor de domínio:

```
Tipo: CNAME
Nome: www
Conteúdo: paroquia-cristo-rei.pages.dev
TTL: Auto

Tipo: A
Nome: @
Conteúdo: 192.0.2.1
TTL: Auto
```

**OU** se usando Cloudflare DNS:
```
Tipo: CNAME
Nome: @
Conteúdo: paroquia-cristo-rei.pages.dev
Proxy: Ativado (nuvem laranja)
```

### 4. Configurações de Segurança

#### 4.1 Headers de Segurança
O arquivo `_headers` já está configurado com:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

#### 4.2 SSL/TLS
- SSL/TLS será configurado automaticamente
- Modo: "Full (strict)"
- Certificado: Automático

### 5. Otimizações de Performance

#### 5.1 Cloudflare Dashboard
1. Vá para "Speed" → "Optimization"
2. Ative:
   - Auto Minify (HTML, CSS, JS)
   - Brotli Compression
   - Rocket Loader
   - Mirage

#### 5.2 Cache
1. Vá para "Caching" → "Configuration"
2. Configure:
   - Browser Cache TTL: 1 mês
   - Edge Cache TTL: 1 hora

### 6. Monitoramento

#### 6.1 Analytics
1. Ative "Web Analytics" no Cloudflare Pages
2. Configure Google Analytics (opcional)

#### 6.2 Alertas
1. Configure alertas para downtime
2. Monitore performance

## 🚀 Comandos para Deploy

### Primeiro Deploy
```bash
# 1. Fazer commit inicial
git add .
git commit -m "Initial commit: Coming soon page for Paróquia Cristo Rei"
git push origin main

# 2. O Cloudflare Pages fará deploy automático
```

### Deploys Futuros
```bash
# Qualquer push para main fará deploy automático
git add .
git commit -m "Update: [descrição da mudança]"
git push origin main
```

## 🔧 Troubleshooting

### Problema: Build Falha
**Solução:**
1. Verifique logs no Cloudflare Pages
2. Confirme que `next.config.js` está correto
3. Verifique se todas as dependências estão no `package.json`

### Problema: Domínio Não Funciona
**Solução:**
1. Verifique configuração DNS
2. Aguarde propagação (até 24h)
3. Confirme que SSL está ativo

### Problema: Site Não Carrega
**Solução:**
1. Verifique se o build foi bem-sucedido
2. Confirme configurações de domínio
3. Verifique headers de segurança

## 📞 Contatos de Suporte

- **Cloudflare Support:** https://support.cloudflare.com
- **Documentação:** https://developers.cloudflare.com/pages/
- **Status Page:** https://www.cloudflarestatus.com/

## ✅ Checklist Final

- [ ] Repositório GitHub configurado
- [ ] Cloudflare Pages conectado
- [ ] Build configurado corretamente
- [ ] Domínio personalizado adicionado
- [ ] DNS configurado
- [ ] SSL ativo
- [ ] Site funcionando
- [ ] Otimizações aplicadas
- [ ] Monitoramento configurado
