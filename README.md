# Paróquia Cristo Rei - Website

Website oficial da Paróquia Cristo Rei com página "em breve" e futuras seções para batismos, horários de missas, casamentos e catequese.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Cloudflare Pages** - Hospedagem e CDN

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no GitHub
- Conta no Cloudflare
- Domínio paroquiacristorei.org configurado

## 🛠️ Instalação e Desenvolvimento

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/[seu-usuario]/paroquia-cristo-rei.git
   cd paroquia-cristo-rei
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse:** http://localhost:3000

## 🚀 Deploy no Cloudflare Pages

### Passo 1: Preparar o Repositório GitHub

1. **Faça commit das alterações:**
   ```bash
   git add .
   git commit -m "Initial commit: Coming soon page"
   git push origin main
   ```

### Passo 2: Configurar Cloudflare Pages

1. **Acesse o Cloudflare Dashboard:**
   - Vá para https://dash.cloudflare.com
   - Faça login na sua conta

2. **Criar novo projeto Pages:**
   - Clique em "Pages" no menu lateral
   - Clique em "Create a project"
   - Selecione "Connect to Git"

3. **Conectar ao GitHub:**
   - Autorize o Cloudflare a acessar seu GitHub
   - Selecione o repositório `paroquia-cristo-rei`
   - Clique em "Begin setup"

4. **Configurar Build Settings:**
   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   Root directory: /
   ```

5. **Configurar Variáveis de Ambiente (se necessário):**
   - NODE_ENV: production

6. **Deploy:**
   - Clique em "Save and Deploy"
   - Aguarde o build completar

### Passo 3: Configurar Domínio Personalizado

1. **No Cloudflare Pages:**
   - Vá para o projeto criado
   - Clique na aba "Custom domains"
   - Clique em "Set up a custom domain"

2. **Adicionar domínio:**
   - Digite: `paroquiacristorei.org`
   - Clique em "Continue"

3. **Configurar DNS:**
   - O Cloudflare irá mostrar as configurações DNS necessárias
   - Adicione um registro CNAME apontando para o domínio do Pages
   - Exemplo: `www CNAME paroquia-cristo-rei.pages.dev`

4. **Configurar SSL:**
   - O Cloudflare irá automaticamente configurar SSL/TLS
   - Aguarde a ativação (pode levar alguns minutos)

### Passo 4: Configurações Adicionais

1. **Configurar Redirects (opcional):**
   - No Cloudflare Pages, vá para "Functions"
   - Crie redirects se necessário

2. **Otimizações:**
   - Ative "Auto Minify" no Cloudflare Dashboard
   - Configure "Browser Cache TTL" para melhor performance

## 📁 Estrutura do Projeto

```
paroquia-cristo-rei/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
├── next.config.js
├── _headers
├── package.json
└── README.md
```

## 🎨 Personalização

### Adicionar Logo Real

1. Coloque o arquivo do logo em `public/logo.png`
2. Atualize o componente em `src/app/page.tsx`:

```tsx
<Image
  src="/logo.png"
  alt="Paróquia Cristo Rei"
  width={128}
  height={128}
  className="mx-auto"
/>
```

### Atualizar Informações de Contato

Edite o arquivo `src/app/page.tsx` e atualize as informações:
- Endereço da paróquia
- Telefone
- Email

## 🔄 Atualizações Futuras

Para adicionar novas seções (batismos, missas, etc.):

1. Crie novos componentes em `src/components/`
2. Adicione rotas em `src/app/`
3. Faça commit e push para GitHub
4. O Cloudflare Pages fará deploy automático

## 📞 Suporte

Para dúvidas sobre a configuração:
- Documentação Cloudflare Pages: https://developers.cloudflare.com/pages/
- Documentação Next.js: https://nextjs.org/docs

## 📝 Próximos Passos

1. ✅ Página "em breve" criada
2. ⏳ Configurar domínio no Cloudflare
3. ⏳ Adicionar logo real da paróquia
4. ⏳ Implementar seções principais
5. ⏳ Adicionar formulários de contato
6. ⏳ Implementar sistema de eventos