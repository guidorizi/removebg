# RemoveBG Fullstack - Parte 2

Aplicação web fullstack para remoção de fundo de imagens com autenticação, busca e inserção de dados persistidos em banco de dados.

## 📋 Descrição

Este projeto implementa uma aplicação web completa em 3 camadas:
- **Frontend**: React.js com Tailwind CSS
- **Backend**: Express.js com tRPC
- **Banco de Dados**: MySQL/TiDB

### Funcionalidades

- ✅ **Login e Autenticação**: Sistema de autenticação OAuth com Manus
- ✅ **Upload de Imagens**: Interface para upload de imagens (máx 10MB)
- ✅ **Processamento**: Remoção automática de fundo usando API remove.bg
- ✅ **Histórico**: Visualização de todas as imagens processadas pelo usuário
- ✅ **Download**: Download das imagens processadas
- ✅ **Persistência**: Armazenamento de imagens no S3 e metadados no banco de dados

## 🏗️ Arquitetura

### Backend (Express.js + tRPC)

```
server/
├── _core/           # Configuração do servidor
├── routes/          # Rotas HTTP (upload)
├── db.ts            # Funções de acesso ao banco de dados
├── routers.ts       # Rotas tRPC (API)
└── *.test.ts        # Testes unitários
```

**Rotas tRPC:**
- `images.list` - Buscar histórico de imagens do usuário (protegida)
- `images.create` - Inserir nova imagem processada (protegida)
- `images.getById` - Buscar imagem específica por ID (protegida)

**Rotas HTTP:**
- `POST /api/upload` - Upload de arquivos para S3

### Frontend (React.js)

```
client/src/
├── pages/
│   ├── ProcessImage.tsx  # Página de upload e processamento
│   └── History.tsx        # Página de histórico
├── components/           # Componentes reutilizáveis
└── App.tsx              # Rotas e navegação
```

### Banco de Dados

**Tabela `users`**: Usuários autenticados
**Tabela `processed_images`**: Imagens processadas com URLs do S3

## 🔒 Segurança

- ✅ **HTTPS**: Configurado automaticamente pela plataforma
- ✅ **JWT**: Autenticação segura com tokens
- ✅ **Helmet**: Headers HTTP seguros
- ✅ **Rate Limiting**: Proteção contra ataques automatizados (100 req/15min)
- ✅ **Sanitização**: Validação e sanitização de inputs (previne XSS)
- ✅ **Logs**: Registro de autenticação, buscas e inserções

## ⚡ Otimização

- ✅ **Compressão**: Compressão de respostas do servidor (gzip)
- ✅ **Pool de Conexões**: Gerenciamento eficiente de conexões com banco
- ✅ **Cache**: Estratégia de cache implementada
- ✅ **Validação**: Validação de campos no servidor com Zod

## 🧪 Testes

O projeto inclui testes unitários com Vitest:

```bash
pnpm test
```

**Testes implementados:**
- ✅ `auth.logout.test.ts` - Teste de logout
- ✅ `images.list.test.ts` - Teste de listagem de imagens
- ✅ `images.create.test.ts` - Teste de criação de imagens (incluindo sanitização XSS)

## 🚀 Execução

### Pré-requisitos

- Node.js 22+
- pnpm
- Banco de dados MySQL/TiDB configurado

### Instalação

```bash
# Instalar dependências
pnpm install

# Aplicar migrações do banco de dados
pnpm db:push

# Executar testes
pnpm test

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Variáveis de Ambiente

As seguintes variáveis são configuradas automaticamente pela plataforma:

- `DATABASE_URL` - String de conexão com banco de dados
- `JWT_SECRET` - Segredo para assinatura de tokens
- `VITE_APP_ID` - ID da aplicação OAuth
- `OAUTH_SERVER_URL` - URL do servidor OAuth
- `VITE_OAUTH_PORTAL_URL` - URL do portal de login

## 📦 Dependências Principais

### Backend
- `express` - Framework web
- `@trpc/server` - tRPC para APIs type-safe
- `drizzle-orm` - ORM para banco de dados
- `helmet` - Segurança HTTP
- `compression` - Compressão de respostas
- `express-rate-limit` - Rate limiting
- `validator` - Validação e sanitização
- `multer` - Upload de arquivos

### Frontend
- `react` - Biblioteca UI
- `@tanstack/react-query` - Gerenciamento de estado
- `@trpc/react-query` - Cliente tRPC
- `tailwindcss` - Framework CSS
- `axios` - Cliente HTTP (para API remove.bg)
- `date-fns` - Formatação de datas

## 👨‍💻 Autor

**João Victor Guidorizi da Silva**

## 📄 Licença

Este projeto foi desenvolvido como parte da disciplina ES47B - Programação Web Fullstack.
